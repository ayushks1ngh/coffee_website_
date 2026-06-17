"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const FRAME_COUNT = 120;

// ─── Mount Gate Wrapper ───────────────────────────────────────────
// Renders nothing on the server. Once client mounts, renders the real component.
// This guarantees useScroll always targets a hydrated DOM ref.
export default function CoffeeCraveReveal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <CoffeeCraveInner />;
}

// ─── Inner Component (client-only, all hooks unconditional) ───────
function CoffeeCraveInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const [hasExited, setHasExited] = useState(false);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // ── Scroll tracking (ref is GUARANTEED to be in the DOM here) ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const frameIndex = useTransform(springProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // ── Beat transforms (all unconditional, top-level) ──
  const beatAOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.25],
    [1, 1, 0, 0],
  );
  const beatAY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const beatBOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.4, 0.45],
    [0, 1, 1, 0],
  );
  const beatBY = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.4, 0.45],
    [50, 0, 0, -50],
  );

  const beatCOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.65, 0.7],
    [0, 1, 1, 0],
  );
  const beatCY = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.65, 0.7],
    [50, 0, 0, -50],
  );

  const beatDOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.75, 0.9, 1],
    [0, 1, 1, 1],
  );
  const beatDY = useTransform(scrollYProgress, [0.7, 0.75, 1], [50, 0, 0]);

  const scrollDownOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // ── Image preloader ──
  useEffect(() => {
    let alive = true;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!alive) return;

        await new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/sequence/frame_${i}.webp`;
          img.onload = () => {
            loadedImages[i] = img;
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            console.warn(
              `Failed to load frame ${i}. Will fallback to nearest.`,
            );
            resolve();
          };
        });
      }

      if (alive) {
        let lastValid: HTMLImageElement | null = null;
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (loadedImages[i] && loadedImages[i].complete) {
            lastValid = loadedImages[i];
          } else if (lastValid) {
            loadedImages[i] = lastValid;
          }
        }

        setImages(loadedImages);
        setTimeout(() => setLoaded(true), 500);
      }
    };

    loadImages();

    const handleResize = () => {
      if (containerRef.current) {
        setCanvasSize({
          w: containerRef.current.clientWidth,
          h: window.innerHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      alive = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ── Canvas draw function ──
  const drawCanvas = useCallback(
    (progressVal: number) => {
      if (!loaded || !canvasRef.current || images.length === 0 || hasExited)
        return;

      if (!ctxRef.current) {
        ctxRef.current = canvasRef.current.getContext("2d", { alpha: false });
      }
      const ctx = ctxRef.current;
      if (!ctx) return;

      const currentIndex = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.floor(progressVal)),
      );
      const currentImage = images[currentIndex];

      if (
        currentImage &&
        currentImage.complete &&
        currentImage.naturalWidth > 0
      ) {
        const imgRatio = currentImage.width / currentImage.height;
        const canvasLogicalWidth = canvasSize.w;
        const canvasLogicalHeight = canvasSize.h;
        const canvasRatio = canvasLogicalWidth / canvasLogicalHeight;

        let drawWidth = canvasLogicalWidth;
        let drawHeight = canvasLogicalHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawWidth = canvasLogicalHeight * imgRatio;
          offsetX = (canvasLogicalWidth - drawWidth) / 2;
        } else {
          drawHeight = canvasLogicalWidth / imgRatio;
          offsetY = (canvasLogicalHeight - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvasLogicalWidth, canvasLogicalHeight);
        ctx.fillStyle = "#0a0908";
        ctx.fillRect(0, 0, canvasLogicalWidth, canvasLogicalHeight);
        ctx.drawImage(currentImage, offsetX, offsetY, drawWidth, drawHeight);
      }
    },
    [loaded, images, hasExited, canvasSize.w, canvasSize.h],
  );

  // ── Retina canvas sizing ──
  useEffect(() => {
    if (canvasRef.current && canvasSize.w > 0 && canvasSize.h > 0) {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvasSize.w * dpr;
      canvas.height = canvasSize.h * dpr;
      canvas.style.width = `${canvasSize.w}px`;
      canvas.style.height = `${canvasSize.h}px`;

      ctxRef.current = canvas.getContext("2d", { alpha: false });
      if (ctxRef.current) {
        ctxRef.current.scale(dpr, dpr);
      }
      drawCanvas(frameIndex.get());
    }
  }, [canvasSize, loaded, drawCanvas, frameIndex]);

  // ── Motion lifecycle listeners (subscribe/unsubscribe cleanly) ──
  useEffect(() => {
    let unsubscribeFrame: (() => void) | undefined;

    const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.99 && !hasExited) {
        setHasExited(true);
      } else if (latest < 0.99 && hasExited) {
        setHasExited(false);
        drawCanvas(frameIndex.get());
      }
    });

    if (!hasExited) {
      unsubscribeFrame = frameIndex.on("change", (latest) => {
        drawCanvas(latest);
      });
    }

    return () => {
      unsubscribeScroll();
      if (unsubscribeFrame) unsubscribeFrame();
    };
  }, [hasExited, scrollYProgress, frameIndex, drawCanvas]);

  // ── JSX ──
  return (
    <>
      {/* Loading Screen */}
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-almond_cream"
        initial={{ opacity: 1 }}
        animate={{ opacity: loaded ? 0 : 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ pointerEvents: loaded ? "none" : "auto" }}
      >
        <h1 className="text-3xl font-extralight tracking-widest mb-4">
          COFFEE CRAVE
        </h1>
        <div className="w-48 h-[1px] bg-stone_brown/30 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-stone_brown transition-all duration-75 ease-linear"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="mt-4 text-xs tracking-widest text-almond_cream/50 uppercase">
          Engineering Sensory Experience {loadingProgress}%
        </p>
      </motion.div>

      {/* Scroll Container */}
      <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
        {/* Sticky Canvas & Story Container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />

          {/* Vignette Overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, transparent 40%, rgba(10,9,8,0.95) 100%)",
            }}
          />

          {/* Cinematic glass diffusion — frosted atmospheric depth between image and text */}
          <div
            className="absolute inset-0 z-[15] pointer-events-none"
            aria-hidden="true"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(10,9,8,0.12)",
              maskImage:
                "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 55% 45% at 50% 48%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 65%)",
            }}
          />

          {/* Story Texts — Bold editorial with studio-lit diffusion */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            {/* Beat A — "COFFEE REIMAGINED" */}
            <motion.div
              className="absolute text-center px-4 w-full"
              style={{ opacity: beatAOpacity, y: beatAY }}
            >
              <h2
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(2.5rem, 10vw, 10rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  textShadow:
                    "0 0 40px rgba(255,255,255,0.06), 0 0 20px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                COFFEE
                <br />
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  REIMAGINED
                </span>
              </h2>
              <p
                className="mt-5 md:mt-8 text-xs md:text-sm lg:text-base font-light tracking-[0.15em] uppercase max-w-lg mx-auto"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.25)",
                }}
              >
                Crafted beyond taste. Engineered for sensation.
              </p>
            </motion.div>

            {/* Beat B — "PRECISION IN EVERY DROP" */}
            <motion.div
              className="absolute text-center px-4 w-full"
              style={{ opacity: beatBOpacity, y: beatBY }}
            >
              <h2
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(2rem, 8vw, 8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  textShadow:
                    "0 0 40px rgba(255,255,255,0.06), 0 0 20px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                PRECISION
                <br />
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  IN EVERY DROP
                </span>
              </h2>
              <p
                className="mt-5 md:mt-8 text-xs md:text-sm lg:text-base font-light tracking-[0.15em] uppercase max-w-lg mx-auto"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.25)",
                }}
              >
                Ethically sourced. Perfect extraction. Relentless refinement.
              </p>
            </motion.div>

            {/* Beat C — "THE SCIENCE OF INDULGENCE" */}
            <motion.div
              className="absolute text-center px-4 w-full"
              style={{ opacity: beatCOpacity, y: beatCY }}
            >
              <h2
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(1.8rem, 7vw, 7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  textShadow:
                    "0 0 40px rgba(255,255,255,0.06), 0 0 20px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                THE SCIENCE
                <br />
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  OF INDULGENCE
                </span>
              </h2>
              <p
                className="mt-5 md:mt-8 text-xs md:text-sm lg:text-base font-light tracking-[0.15em] uppercase max-w-lg mx-auto"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.25)",
                }}
              >
                Temperature, texture, and flavor in harmony.
              </p>
            </motion.div>

            {/* Beat D — "TASTE THE TRUTH" + CTA */}
            <motion.div
              className="absolute text-center px-4 w-full top-3/4 transform -translate-y-1/2 flex flex-col items-center pointer-events-auto z-50"
              style={{ opacity: beatDOpacity, y: beatDY }}
            >
              <h2
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(1.8rem, 7vw, 7rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  textShadow:
                    "0 0 40px rgba(255,255,255,0.06), 0 0 20px rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                TASTE
                <br />
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  THE TRUTH
                </span>
              </h2>
              <p
                className="mt-4 md:mt-6 mb-8 text-xs md:text-sm font-light tracking-[0.15em] uppercase"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textShadow: "0 1px 6px rgba(0,0,0,0.25)",
                }}
              >
                Experience COFFEE CRAVE.
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  alert("Added to cart: 1x COFFEE CRAVE Iced Latte")
                }
                className="px-10 py-3.5 rounded-full text-xs md:text-sm tracking-[0.2em] uppercase cursor-pointer relative z-50 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  color: "#0a0908",
                  fontWeight: 600,
                }}
              >
                Order Your Iced Latte
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
            style={{ opacity: scrollDownOpacity }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-almond_cream/50 mb-3 block">
              Scroll to Explore
            </span>
            <div className="w-[1px] h-12 bg-stone_brown/30 relative overflow-hidden">
              <motion.div
                className="absolute top-0 w-full h-1/2 bg-stone_brown"
                animate={{ top: ["-50%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

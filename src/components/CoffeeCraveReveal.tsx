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
  const beatAOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0]);
  const beatAY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const beatBOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const beatBY = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [50, 0, 0, -50]);

  const beatCOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.7], [0, 1, 1, 0]);
  const beatCY = useTransform(scrollYProgress, [0.45, 0.5, 0.65, 0.7], [50, 0, 0, -50]);

  const beatDOpacity = useTransform(scrollYProgress, [0.7, 0.75, 0.9, 1], [0, 1, 1, 1]);
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
          img.src = `/sequence/frame_${i}.jpg`;
          img.onload = () => {
            loadedImages[i] = img;
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load frame ${i}. Will fallback to nearest.`);
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
  const drawCanvas = useCallback((progressVal: number) => {
    if (!loaded || !canvasRef.current || images.length === 0 || hasExited) return;

    if (!ctxRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d", { alpha: false });
    }
    const ctx = ctxRef.current;
    if (!ctx) return;

    const currentIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(progressVal)));
    const currentImage = images[currentIndex];

    if (currentImage && currentImage.complete && currentImage.naturalWidth > 0) {
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
  }, [loaded, images, hasExited, canvasSize.w, canvasSize.h]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize, loaded]);

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
        <h1 className="text-3xl font-extralight tracking-widest mb-4">COFFEE CRAVE</h1>
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
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(10,9,8,0.95) 100%)' }} />

          {/* Text Backdrop — subtle radial darken behind typography zone only */}
          <div
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,9,8,0.5) 0%, transparent 70%)',
              mixBlendMode: 'normal',
            }}
          />

          {/* Story Texts */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">

            {/* Beat A */}
            <motion.div
              className="absolute text-center px-6"
              style={{ opacity: beatAOpacity, y: beatAY }}
            >
              <h2
                className="text-4xl md:text-6xl font-light tracking-tight text-almond_cream/90 mb-6 leading-[1.05]"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                COFFEE, REIMAGINED.
              </h2>
              <p className="text-sm md:text-lg text-almond_cream/60 font-light tracking-wide max-w-xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                Crafted beyond taste. Engineered for sensation.
              </p>
            </motion.div>

            {/* Beat B */}
            <motion.div
              className="absolute text-center px-6"
              style={{ opacity: beatBOpacity, y: beatBY }}
            >
              <h2
                className="text-4xl md:text-6xl font-light tracking-tight text-khaki_beige/90 mb-6 leading-[1.05]"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                PRECISION IN EVERY DROP
              </h2>
              <p className="text-sm md:text-lg text-almond_cream/60 font-light tracking-wide max-w-xl mx-auto leading-relaxed" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                Ethically sourced beans. Perfect extraction. Relentless refinement.
              </p>
            </motion.div>

            {/* Beat C */}
            <motion.div
              className="absolute text-center px-6 w-full max-w-sm md:max-w-xl mx-auto"
              style={{ opacity: beatCOpacity, y: beatCY }}
            >
              <h2
                className="text-3xl md:text-5xl font-light tracking-tight text-almond_cream/90 mb-4 md:mb-6 leading-[1.05]"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                THE SCIENCE OF INDULGENCE
              </h2>
              <p className="text-sm md:text-lg text-almond_cream/60 font-light tracking-wide leading-relaxed" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                Temperature, texture, and flavor working in harmony.
              </p>
            </motion.div>

            {/* Beat D */}
            <motion.div
              className="absolute text-center px-6 top-3/4 transform -translate-y-1/2 flex flex-col items-center pointer-events-auto relative z-50"
              style={{ opacity: beatDOpacity, y: beatDY }}
            >
              <h2
                className="text-3xl md:text-5xl font-light tracking-tight text-almond_cream/90 mb-4 leading-[1.05]"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                TASTE THE INNER TRUTH
              </h2>
              <p className="text-sm md:text-base text-almond_cream/60 font-light tracking-wide mb-8 leading-relaxed" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                Experience COFFEE CRAVE.
              </p>

              <motion.button
                whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => alert("Added to cart: 1x COFFEE CRAVE Iced Latte")}
                className="bg-almond_cream text-black px-8 py-3 rounded-full text-sm tracking-widest uppercase cursor-pointer relative z-50 transition-all duration-300"
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-almond_cream/50 mb-3 block">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-stone_brown/30 relative overflow-hidden">
              <motion.div
                className="absolute top-0 w-full h-1/2 bg-stone_brown"
                animate={{ top: ['-50%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-almond_cream px-6">
      <span className="text-[10px] tracking-[0.5em] uppercase text-stone_brown/50 mb-6">
        404
      </span>
      <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-almond_cream/50 font-light mb-10">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="bg-khaki_beige/90 text-black px-8 py-3.5 rounded-full text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#e2d6c6] pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-3 w-20 bg-stone_brown/10 rounded mb-6" />
        <div className="h-12 w-64 bg-stone_brown/10 rounded mb-6" />
        <div className="h-[1px] w-16 bg-stone_brown/10 mb-14" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-2xl border border-stone_brown/8">
              <div className="w-24 h-24 rounded-xl bg-stone_brown/10" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-40 bg-stone_brown/10 rounded" />
                <div className="h-3 w-16 bg-stone_brown/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

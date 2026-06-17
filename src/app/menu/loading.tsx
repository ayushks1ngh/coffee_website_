export default function Loading() {
  return (
    <div className="min-h-screen bg-[#e2d6c6] pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-3 w-24 bg-stone_brown/10 rounded mb-6" />
        <div className="h-12 w-72 bg-stone_brown/10 rounded mb-6" />
        <div className="h-[1px] w-16 bg-stone_brown/10 mb-6" />
        <div className="h-4 w-96 bg-stone_brown/10 rounded mb-14" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-stone_brown/8">
              <div className="aspect-[4/3] bg-stone_brown/10" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-32 bg-stone_brown/10 rounded" />
                <div className="h-3 w-20 bg-stone_brown/10 rounded" />
                <div className="h-3 w-full bg-stone_brown/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

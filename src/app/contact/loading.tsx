export default function Loading() {
  return (
    <div className="min-h-screen bg-[#e2d6c6] pt-28 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-3 w-20 bg-stone_brown/10 rounded mb-6" />
        <div className="h-12 w-56 bg-stone_brown/10 rounded mb-6" />
        <div className="h-[1px] w-16 bg-stone_brown/10 mb-14" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="h-10 w-full bg-stone_brown/10 rounded" />
            <div className="h-10 w-full bg-stone_brown/10 rounded" />
            <div className="h-24 w-full bg-stone_brown/10 rounded" />
          </div>
          <div className="space-y-6">
            <div className="h-4 w-40 bg-stone_brown/10 rounded" />
            <div className="h-4 w-52 bg-stone_brown/10 rounded" />
            <div className="h-4 w-36 bg-stone_brown/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

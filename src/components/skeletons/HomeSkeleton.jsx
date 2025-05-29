import Searchbar from "../Searchbar";

export default function HomeSkeleton() {
  const skeletonArray = Array(12).fill(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Only Searchbar visible */}
      <Searchbar />

      <div className="pt-20 flex max-w-[1400px] mx-auto px-4">
        {/* Sidebar Skeleton */}
        <aside className="hidden md:flex flex-col space-y-4 pr-6 w-24 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="w-12 h-3 rounded bg-gray-300" />
            </div>
          ))}
        </aside>

        {/* Video Grid Skeleton */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {skeletonArray.map((_, idx) => (
            <div key={idx} className="space-y-3">
              {/* Video thumbnail */}
              <div className="aspect-video w-full bg-gray-300 rounded-xl" />

              {/* Channel row: avatar + text */}
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 bg-gray-300 rounded-full" />
                <div className="flex flex-col space-y-2 w-full">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

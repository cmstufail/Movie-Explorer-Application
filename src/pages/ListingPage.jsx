import { useMemo } from "react";

import SearchBar from "../components/SearchBar";

import MovieCard from "../components/MovieCard";

import Footer from "../components/Footer";

import { Film, RefreshCw, AlertCircle } from "lucide-react";

export default function ListingPage({
  shows,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onSelectDetails,
  favorites,
  onToggleFavorite,
  onRetry,
  isSearching,
}) {
  // Process shows filtering and sorting
  const filteredShows = useMemo(() => {
    let result = [...shows];

    // Filter by genre
    if (selectedGenre && selectedGenre !== "All") {
      result = result.filter(
        (show) =>
          show.genres &&
          show.genres.some(
            (g) => g.toLowerCase() === selectedGenre.toLowerCase(),
          ),
      );
    }

    // Sort shows
    if (sortBy === "rating") {
      result.sort(
        (a, b) => (b.rating?.average || 0) - (a.rating?.average || 0),
      );
    } else if (sortBy === "newest") {
      result.sort((a, b) => {
        const dateA = a.premiered ? new Date(a.premiered).getTime() : 0;
        const dateB = b.premiered ? new Date(b.premiered).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "name") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [shows, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen flex flex-col pt-3">
      <main className="flex-1 max-w-7xl 2xl:max-w-370 mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Page Header */}
        <div className="mb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Film className="w-8 h-8 text-purple-400" />
            Movie & TV Show Library
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Browse, search, filter, and inspect detailed cast and show details
            from our TVMaze library.
          </p>
        </div>

        {/* Search & Filter Bar Controls */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalCount={filteredShows.length}
          isSearching={isSearching}
        />

        {/* Error Banner State */}
        {error && (
          <div className="p-6 my-8 glass-panel rounded-2xl border border-red-500/30 bg-red-950/20 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
            <div>
              <h3 className="text-lg font-bold text-white">
                Failed to Load Movie Catalog
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-1">
                {error}
              </p>
            </div>
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-500 transition-colors shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeleton Grid */}
        {loading ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
              <div
                key={n}
                className={
                  viewMode === "grid"
                    ? "h-96 rounded-2xl animate-shimmer glass-panel"
                    : "h-44 rounded-2xl animate-shimmer glass-panel"
                }
              />
            ))}
          </div>
        ) : filteredShows.length > 0 ? (
          /* Movie Cards Grid or List View */
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredShows.map((show) => (
              <MovieCard
                key={show.id}
                show={show}
                onSelectDetails={onSelectDetails}
                isFavorite={favorites.some((f) => f.id === show.id)}
                onToggleFavorite={onToggleFavorite}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="py-20 text-center glass-panel rounded-3xl border border-slate-800 p-8 space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
              <Film className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white">No Movies Found</h3>
              <p className="text-sm text-slate-400">
                {searchQuery
                  ? `We couldn't find any titles matching "${searchQuery}". Try searching for another keyword like "Girls", "Game", or "Detective".`
                  : `No movies found under the "${selectedGenre}" genre filter.`}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("All");
                }}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-purple-600/20 inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Search Filters
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer
        onNavigate={(tab) => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}

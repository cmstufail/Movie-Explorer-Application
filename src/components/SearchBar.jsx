import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react";

const GENRES = [
  "All",
  "Action",
  "Anime",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Science-Fiction",
  "Thriller",
];

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalCount,
  isSearching,
}) {
  return (
    <div className="w-full space-y-5 mb-8">
      {/* Search Input Box */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400">
          <Search
            className={`w-5 h-5 ${isSearching ? "animate-pulse text-pink-400" : ""}`}
          />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search for a movie or TV show title (e.g. Girls, Game of Thrones, Batman)..."
          className="w-full pl-12 pr-12 py-4 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-white text-base focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-xl transition-all duration-200"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
            title="Clear search"
          >
            <X className="w-5 h-5 bg-slate-800 rounded-full p-0.5 hover:bg-slate-700" />
          </button>
        )}
      </div>

      {/* Filters and View Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        {/* Genre Pill Filter Buttons (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            Genre:
          </div>
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Sort & Layout View Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400 hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="rating" className="bg-slate-900 text-slate-200">
                ⭐ Highest Rated
              </option>
              <option value="newest" className="bg-slate-900 text-slate-200">
                📅 Release Date
              </option>
              <option value="name" className="bg-slate-900 text-slate-200">
                🔤 Title A-Z
              </option>
            </select>
          </div>

          {/* Grid / List Layout Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Query Info */}
      <div className="flex items-center justify-between px-2 text-sm text-slate-400">
        <div>
          {searchQuery ? (
            <span>
              Search results for{" "}
              <span className="text-purple-300 font-semibold">
                "{searchQuery}"
              </span>
            </span>
          ) : (
            <span>Showing all available catalog movies</span>
          )}
        </div>
        <div className="font-semibold text-slate-300 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800 text-xs">
          {totalCount} {totalCount === 1 ? "Title" : "Titles"} Found
        </div>
      </div>
    </div>
  );
}

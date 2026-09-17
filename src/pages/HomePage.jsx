import HeroBanner from "../components/HeroBanner";

import MovieCard from "../components/MovieCard";

import Footer from "../components/Footer";

import {
  Flame,
  Sparkles,
  Compass,
  Star,
  ChevronRight,
  Film,
  ShieldCheck,
  Zap,
} from "lucide-react";

const GENRE_CATEGORIES = [
  {
    name: "Action & Adventure",
    genre: "Action",
    icon: "⚡",
    color:
      "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
  },
  {
    name: "Sci-Fi & Fantasy",
    genre: "Science-Fiction",
    icon: "🚀",
    color:
      "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300",
  },
  {
    name: "Drama & Crime",
    genre: "Drama",
    icon: "🎭",
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300",
  },
  {
    name: "Comedy & Humour",
    genre: "Comedy",
    icon: "🍿",
    color:
      "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300",
  },
];

export default function HomePage({
  shows,
  loading,
  onNavigateToListing,
  onSelectGenre,
  onSelectDetails,
  favorites,
  onToggleFavorite,
}) {
  // Extract top rated featured shows for trending grid (12 top cards)
  const featuredShows = [...shows]
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col mt-5">
      <main className="flex-1 max-w-7xl 2xl:max-w-370 mx-auto w-full">
        {/* 1. Hero Banner Section */}
        <HeroBanner onExplore={() => onNavigateToListing()} />

        {/* 2. Genre Quick Explorer Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-purple-400" />
                Browse by Category
              </h2>
              <p className="text-sm text-slate-400">
                Quickly jump into your favorite movie genre
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GENRE_CATEGORIES.map((cat) => (
              <div
                key={cat.genre}
                onClick={() => {
                  onSelectGenre(cat.genre);
                  onNavigateToListing();
                }}
                className={`p-6 rounded-2xl bg-linear-to-br ${cat.color} border glass-panel-hover cursor-pointer group flex items-center justify-between`}
              >
                <div className="space-y-1">
                  <span className="text-3xl block mb-2">{cat.icon}</span>
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-200 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Movies{" "}
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured / Trending Shows Showcase */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-2">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Trending Hits</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Top Rated Movies & Series
              </h2>
              <p className="text-sm text-slate-400">
                Handpicked top 12 rated masterpieces based on audience ratings
              </p>
            </div>

            <button
              onClick={() => onNavigateToListing()}
              className="flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group cursor-pointer"
            >
              View Full Catalog{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid Loading Skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-2xl animate-shimmer glass-panel"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredShows.map((show) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  onSelectDetails={onSelectDetails}
                  isFavorite={favorites.some((f) => f.id === show.id)}
                  onToggleFavorite={onToggleFavorite}
                  viewMode="grid"
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. Why Choose MovieExplorer Feature Banner */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto md:mx-0">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Rich Database</h3>
              <p className="text-sm text-slate-400">
                Instant access to detailed show overviews, official sites, air
                dates, and cast lists.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 mx-auto md:mx-0">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Instant Search</h3>
              <p className="text-sm text-slate-400">
                Dynamic search with instant updates by title, genre filters, and
                custom sorting options.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto md:mx-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">100% Free & Open</h3>
              <p className="text-sm text-slate-400">
                No account required. Save your favorite shows directly in your
                browser local storage.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer
        onNavigate={(tab) => {
          if (tab === "home") window.scrollTo({ top: 0, behavior: "smooth" });
          else onNavigateToListing();
        }}
      />
    </div>
  );
}

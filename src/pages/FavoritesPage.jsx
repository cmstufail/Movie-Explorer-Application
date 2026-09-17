import MovieCard from "../components/MovieCard";

import Footer from "../components/Footer";

import { Heart, Clapperboard, Trash2, X } from "lucide-react";

export default function FavoritesPage({
  favorites,
  onSelectDetails,
  onToggleFavorite,
  onClearFavorites,
  onNavigateToListing,
}) {
  return (
    <div className="min-h-screen flex flex-col mt-3">
      <main className="flex-1 max-w-7xl 2xl:max-w-370 mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              My Saved Favorites ({favorites.length})
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Manage your saved movies watchlist. Click the cross button (✕) to
              delete any item.
            </p>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={onClearFavorites}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 text-xs font-semibold transition-colors self-start sm:self-auto shadow-md"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              Clear All Favorites
            </button>
          )}
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((show) => (
              <div key={show.id} className="relative group/fav flex flex-col">
                {/* Floating Cross Button (✕) Overlay */}
                <button
                  onClick={() => onToggleFavorite(show)}
                  className="absolute -top-2.5 -right-2.5 p-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl border-2 border-slate-950 transition-all duration-200 hover:scale-110 z-30 flex items-center justify-center cursor-pointer"
                  title={`Remove ${show.name} from Favorites`}
                  aria-label={`Remove ${show.name} from Favorites`}
                >
                  <X className="w-4 h-4 stroke-3" />
                </button>

                <MovieCard
                  show={show}
                  onSelectDetails={onSelectDetails}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  viewMode="grid"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-3xl border border-slate-800 p-8 space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-pink-600/10 border border-pink-500/20 flex items-center justify-center mx-auto text-pink-400">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white">
                No Favorite Movies Saved
              </h3>
              <p className="text-sm text-slate-400">
                You haven't bookmarked any movies yet. Click the heart icon on
                any movie card to add it to your personal watchlist!
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onNavigateToListing}
                className="px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Clapperboard className="w-4 h-4" />
                Explore Movie Catalog
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer
        onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}

import { useState } from "react";
import { Star, Calendar, Info, Heart, Tv, Film } from "lucide-react";

export default function MovieCard({
  show,
  onSelectDetails,
  isFavorite,
  onToggleFavorite,
  viewMode = "grid",
}) {
  const [imgError, setImgError] = useState(false);

  // Extract poster image
  const posterUrl =
    !imgError && show.image?.medium
      ? show.image.medium
      : !imgError && show.image?.original
        ? show.image.original
        : null;

  // Format rating
  const rating = show.rating?.average ? show.rating.average.toFixed(1) : "N/A";

  // Format release year/date
  const releaseYear = show.premiered
    ? show.premiered.substring(0, 4)
    : "Unknown";

  // Fallback poster placeholder image if missing
  const fallbackPoster =
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop";

  if (viewMode === "list") {
    return (
      <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden p-4 flex flex-col sm:flex-row items-center gap-5 border border-slate-800">
        {/* Poster */}
        <div className="relative w-full sm:w-32 h-44 shrink-0 rounded-xl overflow-hidden bg-slate-900">
          <img
            src={posterUrl || fallbackPoster}
            alt={show.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {rating !== "N/A" && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-slate-950/90 backdrop-blur-md rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1 border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 w-full space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white hover:text-purple-300 transition-colors truncate">
                {show.name}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  {releaseYear}
                </span>
                {show.network?.name && (
                  <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    <Tv className="w-3 h-3 text-indigo-400" />
                    {show.network.name}
                  </span>
                )}
                {show.status && (
                  <span
                    className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase ${
                      show.status === "Running"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {show.status}
                  </span>
                )}
              </div>
            </div>

            {/* Favourite button */}
            <button
              onClick={() => onToggleFavorite(show)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 text-slate-400 hover:text-pink-400 transition-colors shrink-0"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`}
              />
            </button>
          </div>

          {/* Genre Badges */}
          {show.genres && show.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {show.genres.slice(0, 3).map((genb) => (
                <span
                  key={genb}
                  className="px-2 py-0.5 bg-purple-950/60 border border-purple-800/40 text-purple-300 rounded-md text-[11px] font-medium"
                >
                  {genb}
                </span>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-3 flex justify-end">
            <button
              onClick={() => onSelectDetails(show)}
              className="px-5 py-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
            >
              <Info className="w-4 h-4" />
              See Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Card Layout
  return (
    <div className="group glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full border border-slate-800/80 transition-all duration-300">
      {/* Poster Container */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-900">
        <img
          src={posterUrl || fallbackPoster}
          alt={show.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Darken hover effect */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Heart Button Overlay */}
        <button
          onClick={() => onToggleFavorite(show)}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-all duration-200 z-10"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart
            className={`w-4 h-4 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`}
          />
        </button>

        {/* Rating Badge Overlay */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-amber-500/30 z-10 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
        </div>

        {/* Release Year Badge Overlay */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-slate-300 text-[11px] font-semibold flex items-center gap-1 border border-slate-700/60 z-10">
          <Calendar className="w-3 h-3 text-purple-400" />
          <span>{releaseYear}</span>
        </div>
      </div>

      {/* Card Info Body */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors line-clamp-1">
            {show.name}
          </h3>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {show.genres && show.genres.length > 0 ? (
              show.genres.slice(0, 2).map((gen) => (
                <span
                  key={gen}
                  className="px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded-md text-[10px] font-medium border border-slate-700/50"
                >
                  {gen}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-500">General</span>
            )}
          </div>
        </div>

        {/* Action Button: See Details */}
        <button
          onClick={() => onSelectDetails(show)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-linear-to-r hover:from-purple-600 hover:to-indigo-600 text-slate-200 hover:text-white font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 border border-slate-700/80 hover:border-transparent shadow-sm group-hover:shadow-purple-600/20"
        >
          <Info className="w-4 h-4 text-purple-400 group-hover:text-white" />
          See Details
        </button>
      </div>
    </div>
  );
}

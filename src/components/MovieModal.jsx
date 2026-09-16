import { useEffect, useState } from "react";

import {
  X,
  Star,
  Calendar,
  Clock,
  Globe,
  Tv,
  ExternalLink,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";
import { fetchShowCast, stripHtmlTags } from "../api/tvmaze";

export default function MovieModal({
  show,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const [cast, setCast] = useState([]);
  const [loadingCast, setLoadingCast] = useState(true);
  const [backdropError, setBackdropError] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Fetch cast for current show
  useEffect(() => {
    let isMounted = true;
    if (show && show.id) {
      setLoadingCast(true);
      fetchShowCast(show.id).then((castData) => {
        if (isMounted) {
          setCast(castData);
          setLoadingCast(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [show]);

  if (!show) return null;

  // Extract poster/backdrop images
  const originalPoster =
    !backdropError && show.image?.original
      ? show.image.original
      : show.image?.medium || null;
  const fallbackBackdrop =
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop";

  const rating = show.rating?.average ? show.rating.average.toFixed(1) : "N/A";
  const premierDate = show.premiered || "Unknown";
  const cleanSummary = stripHtmlTags(show.summary);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop container */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col animate-modal-entry">
        {/* Top Floating Close Button (✕) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-lg"
          title="Close Modal (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950 shrink-0 overflow-hidden">
          <img
            src={originalPoster || fallbackBackdrop}
            alt={show.name}
            onError={() => setBackdropError(true)}
            className="w-full h-full object-cover opacity-40 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Hero Overlay Details */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end gap-5 z-20">
            {/* Front Poster Thumbnail */}
            <div className="w-24 sm:w-36 h-36 sm:h-52 rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/30 shrink-0 bg-slate-950 hidden sm:block">
              <img
                src={show.image?.medium || originalPoster || fallbackBackdrop}
                alt={show.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Quick Info */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {show.type && (
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
                    {show.type}
                  </span>
                )}
                {show.status && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      show.status === "Running"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {show.status}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {show.name}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-1">
                <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />⭐
                  Rating: {rating}
                </span>

                <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Release: {premierDate}
                </span>

                {show.runtime && (
                  <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    {show.runtime} min
                  </span>
                )}
              </div>
            </div>

            {/* Favorite button inside modal */}
            <button
              onClick={() => onToggleFavorite(show)}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-all shrink-0 hidden sm:block"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart
                className={`w-6 h-6 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Metadata Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Genres
              </span>
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {show.genres && show.genres.length > 0
                  ? show.genres.join(", ")
                  : "N/A"}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Network
              </span>
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {show.network?.name || show.webChannel?.name || "Unknown"}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Language
              </span>
              <div className="text-xs sm:text-sm font-semibold text-white truncate">
                {show.language || "English"}
              </div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Official Link
              </span>
              <div>
                {show.officialSite || show.url ? (
                  <a
                    href={show.officialSite || show.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-semibold underline truncate"
                  >
                    Visit Site <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">N/A</span>
                )}
              </div>
            </div>
          </div>

          {/* Overview / Summary Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Overview & Synopsis
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
              {cleanSummary}
            </p>
          </div>

          {/* Cast Members Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Main Cast
            </h3>

            {loadingCast ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="h-16 rounded-xl animate-shimmer" />
                ))}
              </div>
            ) : cast.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cast.slice(0, 8).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
                  >
                    <img
                      src={
                        item.person?.image?.medium ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                      }
                      alt={item.person?.name}
                      className="w-10 h-10 rounded-full object-cover bg-slate-800 border border-purple-500/20"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {item.person?.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        as {item.character?.name || "Actor"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">
                No cast information listed.
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => onToggleFavorite(show)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-pink-500 text-pink-500" : "text-slate-400"}`}
            />
            {isFavorite ? "Saved in Favorites" : "Add to Favorites"}
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <X className="w-4 h-4" />
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}

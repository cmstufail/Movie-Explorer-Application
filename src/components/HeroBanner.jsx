import { Film, Star, Compass, Flame } from "lucide-react";

export default function HeroBanner({ onExplore }) {
  return (
    <div className="relative overflow-hidden rounded-3xl my-6 mx-4 sm:mx-6 lg:mx-8 border border-slate-800/80 shadow-2xl bg-slate-900/80">
      {/* Background Gradient & Pattern Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-purple-950/80 to-slate-950 opacity-90 z-10" />

      {/* Background Cinematic Movie Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000 transform hover:scale-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />

      {/* Decorative Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Hero Content Grid */}
      <div className="relative z-20 px-6 sm:px-12 py-16 sm:py-24 max-w-4xl">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Unlimited Entertainment Database</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
          DISCOVER YOUR NEXT <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
            FAVORITE MOVIE
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-shadow-slate-800 mb-8 max-w-2xl font-normal leading-relaxed dark:text-slate-600">
          Explore thousands of top-rated movies and TV shows from around the
          world. Access ratings, detailed overviews, cast information, and
          official trailers in one intuitive hub.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExplore}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
            Explore Now
          </button>

          <button
            onClick={onExplore}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:text-white transition-all duration-200 backdrop-blur-md"
          >
            <Film className="w-5 h-5 text-purple-400" />
            Search Library
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              240+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Curated Shows
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 flex items-center gap-1">
              8.8 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Top Ratings
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
              100%
            </div>
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              Free Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

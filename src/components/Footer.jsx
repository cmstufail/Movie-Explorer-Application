import { Film, Globe, Share2, Heart, Sparkles } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-slate-800/80 glass-panel bg-slate-950/90 text-slate-400">
      <div className="max-w-7xl 2xl:max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-600 to-pink-500 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Film className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Movie<span className="text-purple-400">Explorer</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your premier gateway for discovering cinema, TV shows, cast
              details, and entertainment ratings powered by the open TVMaze
              database.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("listing")}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Movie Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("favorites")}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  My Saved Movies
                </button>
              </li>
            </ul>
          </div>

          {/* Credits & External Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Data & Credits
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Movie metadata and images provided by{" "}
              <a
                href="https://www.tvmaze.com/api"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 underline font-semibold"
              >
                TVMaze API
              </a>
              .
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.tvmaze.com/api"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-purple-500/50 transition-colors flex items-center gap-1 text-xs"
                title="API Documentation"
              >
                <Globe className="w-4 h-4 text-purple-400" /> TVMaze API
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-purple-500/50 transition-colors flex items-center gap-1 text-xs"
                title="Share"
              >
                <Share2 className="w-4 h-4 text-pink-400" /> Share App
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 2026 MovieExplorer. All rights reserved. Built with React &
            Tailwind CSS.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            Designed with{" "}
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for
            movie lovers.
          </div>
        </div>
      </div>
    </footer>
  );
}

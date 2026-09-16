import { useState } from "react";

import {
  Film,
  Home,
  Clapperboard,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  favoriteCount,
  onQuickSearch,
  theme,
  onToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navHandleClick = (section) => {
    setActiveTab(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl 2xl:max-w-370 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div
            onClick={() => navHandleClick("home")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-6 h-6 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              {/* <span className="text-xl sm:text-2xl font-extrabold bg-linear-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
                Movie<span className="text-purple-400">Explorer</span>
              </span> */}
              <span className="text-xl sm:text-2xl font-extrabold movie-title">
                Movie<span className="movie-explorer">Explorer</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                Discover & Stream Info
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navHandleClick("home")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            <button
              onClick={() => navHandleClick("listing")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200 ${
                activeTab === "listing"
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Clapperboard className="w-4 h-4" />
              Browse Movies
            </button>

            <button
              onClick={() => navHandleClick("favorites")}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer font-medium text-sm transition-all duration-200 ${
                activeTab === "favorites"
                  ? "bg-pink-600/20 text-pink-300 border border-pink-500/30 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${favoriteCount > 0 ? "text-pink-400 fill-pink-400" : ""}`}
              />
              Favorites
              {favoriteCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-pink-500/30 text-pink-300 rounded-full border border-pink-400/40">
                  {favoriteCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl cursor-pointer bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all duration-200 shadow-sm"
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-400" />
              )}
            </button>

            {/* <button
              onClick={() => {
                setActiveTab("listing");
                if (onQuickSearch) onQuickSearch();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm shadow-md shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              Explore Catalog
            </button> */}
            <button
              onClick={() => {
                setActiveTab("listing");
                if (onQuickSearch) onQuickSearch();
              }}
              className="explore-btn flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer font-medium text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              Explore Catalog
            </button>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-400" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => navHandleClick("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors ${
              activeTab === "home"
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Home className="w-5 h-5 text-purple-400" />
            Home Page
          </button>

          <button
            onClick={() => navHandleClick("listing")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors ${
              activeTab === "listing"
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Clapperboard className="w-5 h-5 text-indigo-400" />
            Browse Movies & Shows
          </button>

          <button
            onClick={() => navHandleClick("favorites")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-base transition-colors ${
              activeTab === "favorites"
                ? "bg-pink-600/20 text-pink-300 border border-pink-500/30"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-pink-400" />
              My Favorites
            </div>
            {favoriteCount > 0 && (
              <span className="px-2.5 py-0.5 text-xs font-bold bg-pink-500/30 text-pink-300 rounded-full border border-pink-400/40">
                {favoriteCount}
              </span>
            )}
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                navHandleClick("listing");
                if (onQuickSearch) onQuickSearch();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium text-base shadow-lg shadow-purple-600/20"
            >
              <Sparkles className="w-5 h-5" />
              Search & Explore Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

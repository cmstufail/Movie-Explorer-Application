import { useState, useEffect, useCallback } from "react";

import Navbar from "./components/Navbar";
import MovieModal from "./components/MovieModal";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import FavoritesPage from "./pages/FavoritesPage";
import { fetchShows, searchShows } from "./api/tvmaze";

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); // 'home' | 'listing' | 'favorites'
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("movie_explorer_theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // Search & Filter controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");

  // Modal & Favorites
  const [activeModalShow, setActiveModalShow] = useState(null);
  const [toast, setToast] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("movie_explorer_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply theme class to document body & persist in localStorage
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
    try {
      localStorage.setItem("movie_explorer_theme", theme);
    } catch (e) {
      console.error("Failed to save theme in localStorage:", e);
    }
  }, [theme]);

  // Toast trigger helper
  const showToast = (title, message, type = "info") => {
    setToast({ title, message, type, id: Date.now() });
  };

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      showToast(
        nextTheme === "light" ? "Light Theme ☀️" : "Dark Theme 🌙",
        `Switched to ${nextTheme} mode.`,
        "info",
      );
      return nextTheme;
    });
  };

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "movie_explorer_favorites",
        JSON.stringify(favorites),
      );
    } catch (e) {
      console.error("Failed to save favorites to localStorage:", e);
    }
  }, [favorites]);

  // Initial fetch of shows
  const loadInitialShows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShows();
      setShows(data || []);
    } catch (err) {
      setError(err.message || "Failed to connect to Movie Database API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialShows();
  }, [loadInitialShows]);

  // Debounced search API handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (shows.length === 0 && !loading) {
        loadInitialShows();
      }
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const searchResults = await searchShows(searchQuery);
        setShows(searchResults || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, loadInitialShows]);

  // Favorite toggle handler with toast notification
  const handleToggleFavorite = (show) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === show.id);
      if (exists) {
        showToast(
          "Removed from Favorites",
          `"${show.name}" was removed from your saved list.`,
          "remove",
        );
        return prev.filter((item) => item.id !== show.id);
      } else {
        showToast(
          "Added to Favorites ❤️",
          `"${show.name}" was added to your saved list!`,
          "add",
        );
        return [...prev, show];
      }
    });
  };

  // Clear all favorites with toast notification
  const handleClearFavorites = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all your saved favorite movies?",
      )
    ) {
      setFavorites([]);
      showToast(
        "Cleared Favorites 🗑️",
        "All favorite movies have been removed.",
        "clear",
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-purple-500 selection:text-white relative">
      {/* Sticky Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoriteCount={favorites.length}
        onQuickSearch={() => {
          setActiveTab("listing");
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Dynamic Page Views */}
      <div className="flex-1">
        {activeTab === "home" && (
          <HomePage
            shows={shows}
            loading={loading}
            onNavigateToListing={() => setActiveTab("listing")}
            onSelectGenre={(genre) => {
              setSelectedGenre(genre);
              setActiveTab("listing");
            }}
            onSelectDetails={(show) => setActiveModalShow(show)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {activeTab === "listing" && (
          <ListingPage
            shows={shows}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onSelectDetails={(show) => setActiveModalShow(show)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onRetry={loadInitialShows}
            isSearching={isSearching}
          />
        )}

        {activeTab === "favorites" && (
          <FavoritesPage
            favorites={favorites}
            onSelectDetails={(show) => setActiveModalShow(show)}
            onToggleFavorite={handleToggleFavorite}
            onClearFavorites={handleClearFavorites}
            onNavigateToListing={() => setActiveTab("listing")}
          />
        )}
      </div>

      {/* Interactive Movie Details Modal */}
      {activeModalShow && (
        <MovieModal
          show={activeModalShow}
          onClose={() => setActiveModalShow(null)}
          isFavorite={favorites.some((f) => f.id === activeModalShow.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

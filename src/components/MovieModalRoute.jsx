import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";
import { fetchShowById } from "../api/tvmaze";

export default function MovieModalRoute({
  shows,
  favorites,
  onToggleFavorite,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(
    () =>
      shows.find((s) => String(s.id) === id) ||
      favorites.find((f) => String(f.id) === id) ||
      null,
  );
  const [loading, setLoading] = useState(!show);

  useEffect(() => {
    if (show) return;

    let cancelled = false;
    setLoading(true);
    fetchShowById(id)
      .then((data) => {
        if (!cancelled) setShow(data);
      })
      .catch(() => {
        if (!cancelled) navigate(-1);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, show, navigate]);

  if (loading || !show) return null;

  return (
    <MovieModal
      show={show}
      onClose={() => navigate(-1)}
      isFavorite={favorites.some((f) => f.id === show.id)}
      onToggleFavorite={onToggleFavorite}
    />
  );
}

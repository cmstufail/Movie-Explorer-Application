const BASE_URL = 'https://api.tvmaze.com';


export async function fetchShows() {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error(`Failed to fetch shows (Status ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
}

/**
 * Search shows by title query
 * Endpoint: GET /search/shows?q=:query
 */

export async function searchShows(query) {
  if (!query || !query.trim()) {
    return fetchShows();
  }

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      throw new Error(`Search failed (Status ${response.status})`);
    }
    const data = await response.json();
    // TVMaze search response returns array of { score, show }
    return data.map(item => item.show).filter(Boolean);
  } catch (error) {
    console.error('Error searching shows:', error);
    throw error;
  }
}

export async function fetchShowById(showId) {
  if (!showId) return null;

  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}`);
    if (!response.ok) {
      throw new Error(`Show not found (Status ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching show ${showId}:`, error);
    throw error;
  }
}

export async function fetchShowCast(showId) {
  if (!showId) return [];

  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/cast`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching cast for show ${showId}:`, error);
    return [];
  }
}

/**
 * Utility function to strip HTML tags from summary strings safely
 */
export function stripHtmlTags(htmlString) {
  if (!htmlString) return 'No description available for this title.';
  return htmlString.replace(/<[^>]*>?/gm, '').trim();
}

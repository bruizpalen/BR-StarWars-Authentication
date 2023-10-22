const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const getFavorites = async (user_id) => {
  try {
    const res = await fetch(`${DataBaseURL}/users/${user_id}/favorites`);
    if (!res.ok) {
      throw new Error("Unable to fetch user favorites");
    }
    const data = await res.json();
    return data.favorites;
  } catch (error) {
    console.error("Error fetching user favorites", error);
    throw error;
  }
};

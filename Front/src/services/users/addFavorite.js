const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const addFavorite = async (user_id, resource_type, resource_id) => {
  try {
    const response = await fetch(
      `${DataBaseURL}/users/${user_id}/add_favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: resource_type,
          resource_id: resource_id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to add favorite`);
    }

    return response.json();
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const removeFavorite = async (user_id, resource_type, resource_id) => {
  try {
    const response = await fetch(`${DataBaseURL}/users/${user_id}/favorites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource_type: resource_type,
        favorite_id: resource_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove favorite`);
    }

    return response.json();
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

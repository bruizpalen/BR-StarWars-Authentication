const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

const getResources = async (resource) => {
  try {
    const res = await fetch(`${DataBaseURL}/${resource}`);
    if (!res.ok) {
      throw new Error(`Unable to access ${resource}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export default getResources;

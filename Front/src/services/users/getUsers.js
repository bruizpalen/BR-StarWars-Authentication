const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default getUsers = async () => {
  try {
    const res = await fetch(`${DataBaseURL}/users`);
    if (!res.ok) {
      throw new Error(`Unable to access users`);
    }
    const res_1 = await res.json();
    return res_1;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

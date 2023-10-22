const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const login = async (loginData) => {
  return fetch(`${DataBaseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
};

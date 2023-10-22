const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const signUp = async (signUpData) => {
  return fetch(`${DataBaseURL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });
};

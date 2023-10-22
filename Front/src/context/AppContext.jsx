import React, { createContext, useContext, useEffect, useState } from "react";
import useResource from "../hooks/useResources";
import { getFavorites } from "../services/getFavorites";
const AppContext = createContext();
import { addFavorite } from "../services/users/addFavorite";
import { removeFavorite } from "../services/users/removeFavorite";

export const AppContextProvider = ({ children }) => {
  const [people, peopleIsLoading] = useResource("people");
  const [planets, planetsIsLoading] = useResource("planets");
  const [vehicles, vehiclesIsLoading] = useResource("vehicles");
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [id, setUserID] = useState("");
  const [email, setEmail] = useState("");

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
    setUsername(sessionStorage.getItem("username") || "");
    setUserID(sessionStorage.getItem("user_id") || "");
    setFavorites(JSON.parse(sessionStorage.getItem("favorites")) || {});
  }, []);

  const handleLogIn = ({ token, email, username, id, favorites }) => {
    setToken(token);
    setUsername(username);
    setEmail(email);
    setUserID(id);
    setFavorites({
      favorites: favorites,
    });

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("user_id", id);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const handleSignUp = ({ email, username, token, id, favorites }) => {
    setToken(token);
    setUsername(username);
    setEmail(email);
    setUserID(id);
    setFavorites({
      favorites: favorites,
    });

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("user_id", id);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const handleLogOut = () => {
    setToken("");
    setUsername("");
    setEmail("");
    setUserID("");
    setFavorites({});

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("favorites");
  };

  const addToFavorites = async (id, resourceType, resourceName, resourceId) => {
    try {
      console.log(id, resourceType, resourceName, resourceId);
      const addedFavorite = await addFavorite(id, resourceType, resourceId);

      setFavorites((prevFavorites) => {
        const newFavorites = { ...prevFavorites };

        if (!newFavorites[resourceType]) {
          newFavorites[resourceType] = [];
        }

        newFavorites[resourceType].push({
          id: resourceId,
          name: resourceName,
        });

        return newFavorites;
      });

      const sessionFavorites =
        JSON.parse(sessionStorage.getItem("favorites")) || {};
      if (!sessionFavorites[resourceType]) {
        sessionFavorites[resourceType] = [];
      }
      sessionFavorites[resourceType].push({
        id: resourceId,
        name: resourceName,
      });
      sessionStorage.setItem("favorites", JSON.stringify(sessionFavorites));
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const removeFromFavorites = async (user_id, resource_type, resource_id) => {
    try {
      const removedFavorite = await removeFavorite(
        user_id,
        resource_type,
        resource_id
      );

      setFavorites((prevFavorites) => {
        const newFavorites = { ...prevFavorites };

        if (newFavorites[resource_type]) {
          newFavorites[resource_type] = newFavorites[resource_type].filter(
            (favorite) => favorite.id !== resource_id
          );
        }

        return newFavorites;
      });

      const sessionFavorites =
        JSON.parse(sessionStorage.getItem("favorites")) || {};

      if (sessionFavorites[resource_type]) {
        sessionFavorites[resource_type] = sessionFavorites[
          resource_type
        ].filter((favorite) => favorite.id !== resource_id);
        sessionStorage.setItem("favorites", JSON.stringify(sessionFavorites));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  };

  const store = {
    people,
    planets,
    vehicles,
    peopleIsLoading,
    planetsIsLoading,
    vehiclesIsLoading,
    token,
    username,
    password,
    email,
    id,
    favorites,
  };

  const actions = {
    setToken,
    setPassword,
    setUsername,
    setEmail,
    handleSignUp,
    handleLogOut,
    handleLogIn,
    getFavorites,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;

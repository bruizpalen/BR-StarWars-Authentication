import { useState, useEffect } from "react";
import getFavorites from "../services/getResources";

const useFavorites = (user_id) => {
  const [favorites, setFavorites] = useState({});
  const [favLoading, setFavLoading] = useState(true);

  useEffect(() => {
    getFavorites(user_id)
      .then((res) => {
        setFavorites(res);
        setFavLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFavLoading(false);
      });
  }, [user_id]);

  return { favorites, favLoading };
};

export default useFavorites;

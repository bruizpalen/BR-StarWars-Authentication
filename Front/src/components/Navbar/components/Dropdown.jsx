import React, { useState } from "react";
import useAppContext from "../../../context/AppContext";

const Dropdown = () => {
  const { store, actions } = useAppContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const removeFavorite = (resourceType, favoriteID) => {
    actions.removeFromFavorites(store.id, resourceType, favoriteID);
  };

  const renderFavorites = () => {
    if (Object.keys(store.favorites).length === 0) {
      return <div className="dropdown-item">No favorites</div>;
    }

    const favoriteItems = [];

    for (const resourceType in store.favorites) {
      favoriteItems.push(
        <div key={resourceType} className="dropdown-header">
          {resourceType}
        </div>
      );

      store.favorites[resourceType].forEach((favorite) => {
        favoriteItems.push(
          <div key={favorite.id} className="dropdown-item">
            {favorite.name}
            <span
              className="remove-favorite"
              onClick={() => removeFavorite(resourceType, favorite.id)}
            >
              &#10006;
            </span>
          </div>
        );
      });
    }

    return favoriteItems;
  };

  return (
    <div className={`dropdown ${isDropdownOpen ? "show" : ""} me-2`}>
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        Favorites
      </button>
      <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
        {renderFavorites()}
      </div>
    </div>
  );
};

export default Dropdown;

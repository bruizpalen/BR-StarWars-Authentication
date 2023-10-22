import React from "react";
import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import babyYoda from "../../../../assets/baby_yoda.jpg";
import planet from "../../../../assets/planet.jpg";
import vehicle from "../../../../assets/satellite.jpg";
import useAppContext from "../../../../context/AppContext";

const Card = ({ element_id, resourceType, data }) => {
  const { actions } = useAppContext();
  const imageSrc = getImageForType(resourceType);
  const { store } = useAppContext();

  const id_resource = data?.id;

  const isFavorite =
    store.favorites[resourceType]?.some(
      (favorite) => favorite.id === element_id
    ) || false;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      actions.removeFromFavorites(
        sessionStorage.getItem("user_id"),
        resourceType,
        element_id
      );
    } else {
      actions.addToFavorites(
        sessionStorage.getItem("user_id"),
        resourceType,
        data.name,
        element_id
      );
    }
  };

  return (
    <div className={`card m-3 ${classes.card}`}>
      <div className={`${classes.imageContainer}`}>
        <img src={imageSrc} className={`${classes.card}`} alt="placeholder" />
      </div>
      <h2 className="card-text m-3">{data.name}</h2>
      <div className={`mt-3 mx-3 d-flex flex-column ${classes.cardBody}`}>
        {renderAdditionalInfo(resourceType, data)}
      </div>
      <div className="d-flex card-body justify-content-between">
        <Link to={`/${resourceType}/${id_resource}`}>
          <button className="btn btn-primary">More details!</button>
        </Link>
        <button
          className={`btn ${isFavorite ? "btn-danger" : "btn-secondary"}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <i className="fa-solid fa-heart" />
          ) : (
            <i className="fa-regular fa-heart" />
          )}
        </button>
      </div>
    </div>
  );
};

function getImageForType(resourceType) {
  switch (resourceType) {
    case "people":
      return babyYoda;
    case "planets":
      return planet;
    case "vehicles":
      return vehicle;
    default:
      return "";
  }
}

function renderAdditionalInfo(resourceType, additionalInfo) {
  switch (resourceType) {
    case "people":
      return (
        <>
          <p>Gender: {additionalInfo.gender}</p>
          <p>Hair color: {additionalInfo.hairColor}</p>
          <p>Eye color: {additionalInfo.eyeColor}</p>
        </>
      );
    case "planets":
      return (
        <>
          <p>Population: {additionalInfo.population}</p>
          <p>Terrain: {additionalInfo.terrain}</p>
        </>
      );
    case "vehicles":
      return (
        <>
          <p>Model: {additionalInfo.class_model}</p>
          <p>Passengers: {additionalInfo.passengers}</p>
        </>
      );
    default:
      return null;
  }
}

export default Card;

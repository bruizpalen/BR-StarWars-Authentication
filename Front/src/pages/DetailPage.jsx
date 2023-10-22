import React, { useState, useEffect } from "react";
import useAppContext from "../context/AppContext";
import babyYoda from "../../src/assets/baby_yoda.jpg";
import planet from "../../src/assets/planet.jpg";
import vehicle from "../../src/assets/satellite.jpg";
import { useParams } from "react-router-dom";
import DetailsPerResource from "../components/DetailsPerResource";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const { resourceType, id_resource } = useParams();
  const { store } = useAppContext();
  const { people, vehicles, planets } = store;
  const { peopleIsLoading, vehiclesIsLoading, planetsIsLoading } = store;

  const [resourceToShow, setResourceToShow] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);
  const loading = peopleIsLoading || vehiclesIsLoading || planetsIsLoading;

  useEffect(() => {
    if (!["people", "planets", "vehicles"].includes(resourceType)) {
      return;
    }

    if (resourceType === "people" && people.people) {
      const resource = people.people.find(
        (item) => parseInt(item.id) === parseInt(id_resource)
      );
      if (resource) {
        setResourceToShow(resource);
        setImageToShow(babyYoda);
      }
    } else if (resourceType === "planets" && planets.planets) {
      const resource = planets.planets.find(
        (item) => parseInt(item.id) === parseInt(id_resource)
      );
      if (resource) {
        setResourceToShow(resource);
        setImageToShow(planet);
      }
    } else if (resourceType === "vehicles" && vehicles.vehicles) {
      const resource = vehicles.vehicles.find(
        (item) => parseInt(item.id) === parseInt(id_resource)
      );
      if (resource) {
        setResourceToShow(resource);
        setImageToShow(vehicle);
      }
    }
  }, [
    resourceType,
    id_resource,
    people.people,
    planets.planets,
    vehicles.vehicles,
  ]);

  const exampleText = `Morbi vel vehicula diam, posuere bibendum dui. Nulla facilisi.
    Vestibulum pharetra tellus diam, eget volutpat enim eleifend et.
    Mauris interdum nunc mattis, pharetra libero quis, dictum sapien.
    Ut malesuada justo vel iaculis vehicula. In feugiat metus eget fringilla lacinia.
    Vestibulum convallis, enim in cursus vestibulum, arcu elit ornare libero, et sollicitudin arcu metus et sapien.`;

  if (loading) {
    return (
      <div className="col-6 justify-content-center align-items-center d-flex">
        <div className="spinner">Loading ...</div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 d-flex flex-column">
        <div className="ms-auto">
          <Link to={`/${store.username}/dashboard`}>
            <button className="btn btn-primary ms-auto">Go to dashboard</button>
          </Link>
        </div>
        <div className="row">
          <div className="col-6 justify-content-center align-items-center d-flex">
            <img
              src={imageToShow}
              className="detailImage"
              alt={resourceType}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          <div className="col-6 text-center justify-content-center align-items-center d-flex flex-column">
            <div>
              <h2>{resourceToShow?.name}</h2>
              <p>{exampleText}</p>
            </div>
          </div>
          <DetailsPerResource
            resource={resourceToShow}
            text={exampleText}
            type={resourceType}
          />
        </div>
      </div>
    </>
  );
};

export default DetailPage;

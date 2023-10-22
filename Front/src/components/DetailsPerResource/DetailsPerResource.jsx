import React from "react";

const DetailPerResource = ({ resource, text, type }) => {
  if (type === "people") {
    return (
      <>
        <div className="divider mt-2 text-danger w-100">
          <hr />
        </div>
        <div className="row text-danger">
          <div className="col">
            <p className="text-center mb-0">Name:</p>
            <p className="text-center">{resource?.name}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Gender:</p>
            <p className="text-center">{resource?.gender}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Hair color:</p>
            <p className="text-center">{resource?.hair_color}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Eye color:</p>
            <p className="text-center">{resource?.eye_color}</p>
          </div>
        </div>
      </>
    );
  }

  if (type === "planets") {
    return (
      <>
        <div className="divider mt-2 text-danger w-100">
          <hr />
        </div>
        <div className="row text-danger">
          <div className="col">
            <p className="text-center mb-0">Name:</p>
            <p className="text-center">{resource?.name}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Population:</p>
            <p className="text-center">{resource?.population}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Terrain:</p>
            <p className="text-center">{resource?.terrain}</p>
          </div>
        </div>
      </>
    );
  }

  if (type === "vehicles") {
    return (
      <>
        <div className="divider mt-2 text-danger w-100">
          <hr />
        </div>
        <div className="row text-danger">
          <div className="col">
            <p className="text-center mb-0">Name:</p>
            <p className="text-center">{resource?.name}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Passengers:</p>
            <p className="text-center">{resource?.passengers}</p>
          </div>
          <div className="col">
            <p className="text-center mb-0">Name:</p>
            <p className="text-center">{resource?.class_model}</p>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default DetailPerResource;

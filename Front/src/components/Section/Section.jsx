import React from "react";
import Card from "./components/Card";
import classes from "./Section.module.css";

const Section = ({ title, resourceData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="loaderContainer d-flex justify-content-center align-items-center">
        <div>{title} is loading</div>
        <div
          className="spinner-border d-flex justify-content-center align-items-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-5">
        <div className="text-danger">
          <h1>{title}</h1>
          <div className={classes.scrollContainer}>
            <div className={classes.scroll}>
              {resourceData.map((element) => (
                <Card
                  key={element.id}
                  resourceType={title.toLowerCase()}
                  data={element}
                  element_id={element.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Section;

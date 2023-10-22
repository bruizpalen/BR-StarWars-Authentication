import { useState, useEffect } from "react";
import getResources from "../services/getResources";

const useResource = (targetResource) => {
  const [resource, setResource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getResources(targetResource)
      .then((res) => setResource(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [resource, isLoading];
};

export default useResource;

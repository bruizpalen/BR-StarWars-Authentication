import Section from "../components/Section";
import useAppContext from "../context/AppContext";

export default function DashboardPage() {
  const { store } = useAppContext();

  const {
    people,
    planets,
    vehicles,
    peopleIsLoading,
    planetsIsLoading,
    vehiclesIsLoading,
  } = store;

  return (
    <div>
      {/* People Section */}
      <Section
        title="People"
        resourceData={people.people}
        isLoading={peopleIsLoading}
      />

      {/* Planets Section */}
      <Section
        title="Planets"
        resourceData={planets.planets}
        isLoading={planetsIsLoading}
      />

      {/* Vehicles Section */}
      <Section
        title="Vehicles"
        resourceData={vehicles.vehicles}
        isLoading={vehiclesIsLoading}
      />
    </div>
  );
}

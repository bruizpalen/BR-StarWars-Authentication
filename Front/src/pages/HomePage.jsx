import Section from "../components/Section";
import starWarsLogo from "../assets/star-wars-logo.png";

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="content">
        <h1>Welcome to the Star Wars Universe</h1>
        <div className="neon-wrapper mt-5">
          <div className="neon-light"></div>
          <img
            src={starWarsLogo}
            alt="Star Wars Logo"
            className="star-wars-logo p-5"
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Dropdown from "./components/Dropdown";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import starWarsLogo from "../../assets/star-wars-logo.png";
import useAppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { store } = useAppContext();
  const { token, username, id, email } = store;
  const { actions } = useAppContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    actions.handleLogOut();
    navigate("/");
  };

  return (
    <nav className="navbar bg-dark-subtle">
      <div className="container-fluid w-100 mx-0 me-0">
        {token ? (
          <Link to={`${username}/dashboard`}>
            <img
              src={starWarsLogo}
              alt="Star Wars Logo"
              className={`${classes.logo} mx-3 my-0`}
            />
          </Link>
        ) : (
          <Link to="/">
            <img
              src={starWarsLogo}
              alt="Star Wars Logo"
              className={`${classes.logo} mx-3 my-0`}
            />
          </Link>
        )}
        {!token && (
          <div className="ms-auto">
            <Link
              to="/login"
              className={`btn btn-primary me-2 ${classes.navButton}`}
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className={`btn btn-secondary ${classes.navButton}`}
            >
              Sign Up
            </Link>
          </div>
        )}
        {token && (
          <div className="ms-auto d-flex me-5 gx-5">
            <Dropdown className={`${classes.favorites}`}></Dropdown>
            <button className="btn btn-primary" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

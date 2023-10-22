import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/AppContext";
import { signUp } from "../services/users/signUp";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useAppContext();
  const { store } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(store.favorites);
  }, [store.favorites]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast("Please, fill all fields");
      return;
    }

    const response = await signUp({ email, username, password });

    if (response.ok) {
      const data = await response.json();
      toast.success("Congratulations!! Enjoy the app 😍");
      console.log("User signed up successfully:", data);

      actions.handleSignUp({
        token: data.token,
        email: data.email,
        username: data.username,
        id: data.user_id,
        favorites: data.favorites,
      });
      actions.setFavorites(data.favorites);

      navigate(`/${data.username}/dashboard`);
    } else if (response.status === 400) {
      const errorData = await response.json();
      toast.error(errorData.error);
    } else {
      console.error("Error while signing up:", response);
      toast.error("Error while signing up");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign Up</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

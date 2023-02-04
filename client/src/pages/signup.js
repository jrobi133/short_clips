// create a signup page
//
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

function Signup() {
  // Setting our component's initial state
  const [user, setUser] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all user and store them with setUser
  useEffect(() => {
    loadUser();
  }, []);

  // Loads all user and sets them to user
  function loadUser() {
    API.getUser()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a user from the database with a given id, then reloads user from the db
  function deleteUser(id) {
    API.deleteUser(id)
      .then((res) => loadUser())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveUser method to save the user data
  // Then reload user from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.name && formObject.email) {
      API.saveUser({
        // todo: find out why username is not being
        username: formObject.username,
        email: formObject.email,
        password: formObject.password,
      })
        .then((res) => loadUser())
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            type="text"
            value={formObject.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Name (required)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            type="email"
            value={formObject.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Email (required)"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={formObject.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Password (required)"
          />
        </div>
        <button
          onClick={handleFormSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;

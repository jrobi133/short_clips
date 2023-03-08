import axios from "axios";

// export default {
//   // Gets all user
//   getUser: function () {
//     return axios.get("/api/user");
//   },
//   // Gets the user with the given id
//   getUser: function (id) {
//     return axios.get("/api/user/" + id);
//   },

//   // get login user
//   getLoginUser: function (email, password) {
//     return axios.get("/api/user/" + email + "/" + password);
//   },

//   // Deletes the user with the given id
//   deleteUser: function (id) {
//     return axios.delete("/api/user/" + id);
//   },

//   // Saves a user to the database
//   saveUser: function (userData) {
//     return axios.post("/api/user", userData);
//   },
// };

// export const loginUser = (userData) => {
//   return fetch("/api/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
// };

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return axios.get("/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// TODO this is not working
// export const createUser = (userData) => {
//   return axios.post("/api/user", {
//     email: userData.email,
//     password: userData.password,
//     username: userData.username,
//     //
//     headers: {
//       "Content-Type": "application/json",
//       body: JSON.stringify(userData),
//     },
//   });
// };
export const createUser = (userData) => {
  return axios.post("/api/user", userData);
};

// export const createUser = (userData) => {
//   return fetch("/api/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
// };
// export const createUser = (userData) => {
//   return axios.post("/api/user", userData);
// };
// // export const createUser = (userData) => {
// //   return fetch("/api/users", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify(userData),
// //   });
// // };

// TODO this is not working
export const loginUser = (userData) => {
  return axios.post("/api/user/login", {
    email: userData.email,
    password: userData.password,
    //
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(userData),
    },
  });
};

// export const loginUser = (userData) => {
//   return fetch("/api/users/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

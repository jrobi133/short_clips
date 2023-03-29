import axios from "axios";

// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return axios.get("/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return axios.post("/api/user", userData);
};

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

// export uploadVideo
export const uploadVideo = (videoData) => {
  return axios.post("/api/video/uploadVideo", videoData);
};

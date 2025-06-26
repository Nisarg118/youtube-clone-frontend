import { apiRequest } from "../api/api";

async function signUp({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });
    return res.success;
  } catch (error) {
    console.log("Error while signing up user : ", error);
  }
}

async function logIn({ url, formData }) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
      data: formData,
    });
    console.log(res);
    return res.data.accessToken;
  } catch (error) {
    console.log("Error while signing in user : ", error);
    throw error;
  }
}

async function logout(url) {
  try {
    const res = await apiRequest({
      method: "POST",
      url: url,
    });
    return res.success;
  } catch (error) {
    console.log("Error while logging out user : ", error);
  }
}

async function currentUser() {
  try {
    const res = await apiRequest({
      method: "GET",
      url: "users/current-user",
    });

    return res.data._id;
  } catch (error) {}
}

export { signUp, logIn, logout, currentUser };

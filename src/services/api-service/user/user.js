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
    console.log(formData);
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

async function currentUser(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });

    return res.data;
  } catch (error) {}
}

async function getUserChannelProfile(url) {
  try {
    const res = await apiRequest({
      method: "GET",
      url: url,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error in getUserChannelProfile api service : ", error);
    throw error;
  }
}

export { signUp, logIn, logout, currentUser, getUserChannelProfile };

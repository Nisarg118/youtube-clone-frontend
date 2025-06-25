export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};
export const removeToken = () => localStorage.removeItem("token");

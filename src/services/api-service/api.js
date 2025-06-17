export async function refreshAccessToken() {
  const res = await fetch("http://localhost:8000/api/v1/users/refresh-token", {
    method: "POST",
    credentials: "include", // so cookie with refresh token is sent
  });

  if (!res.ok) {
    throw new Error("Failed to refresh");
  }

  const data = await res.json();
  return data;
}

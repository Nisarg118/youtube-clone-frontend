import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../store/slices/userSlice";
import { useEffect } from "react";

export default function Signuppage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const registerSuccess = useSelector((state) => state.user.registerSuccess);

  function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullName", fullName);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", username);
    console.log("avatar", avatar);

    if (avatar) formdata.append("avatar", avatar);
    if (coverImage) formdata.append("coverImage", coverImage);

    dispatch(signUpUser(formdata));
  }

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login"); // or auto-login if desired
    }
  }, [registerSuccess]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Your email address"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Channel Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full px-3 py-2 border rounded-lg cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/login")}
            className="text-red-500 hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

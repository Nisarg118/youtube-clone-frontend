import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/userSlice";

const ProfileModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <div>
      <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
        <div className="px-5 py-4">
          <p className="font-semibold">Coding Hub</p>
          <p className="text-sm text-gray-500">@codinghub007-p4d</p>
          <button
            onClick={() => navigate("/channel")}
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            View your channel
          </button>
        </div>
        <hr />
        <ul className="text-sm">
          <li
            onClick={() => navigate("profile/dashboard")}
            className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
          >
            YouTube Dashboard
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
            Profile settings
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
            Appearance: Light
          </li>
          <li
            onClick={handleLogout}
            className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600"
          >
            Sign out
          </li>
          <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600">
            Delete Account
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileModal;

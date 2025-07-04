import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/userSlice";
import { apiRequest } from "../services/api-service/api/api";
import Endpoint from "../services/api-service/endpoints";
import { useState } from "react";
import Modal from "./Modal";
const ProfileModal = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleLogout() {
    try {
      dispatch(logoutUser()).then(() => navigate("/login"));
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  async function handleDelete() {
    try {
      await apiRequest(Endpoint.REMOVE_USER);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("Error while deleting user", error);
    }
  }

  return (
    <div>
      <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
        <div className="px-5 py-4">
          <p className="font-semibold">{user.fullName}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
          <button
            onClick={() => navigate(`/channel/${user._id}/videos`)}
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
          <li
            onClick={() => setIsDeleteModalOpen(true)}
            className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-600"
          >
            Delete Account
          </li>
        </ul>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Account Deletion</h2>
        <p className="mb-6 text-sm text-gray-700">
          Are you sure you want to <strong>delete your account</strong>? This
          action is
          <span className="text-red-600 font-medium"> irreversible</span>.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 text-sm text-gray-700 hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileModal;

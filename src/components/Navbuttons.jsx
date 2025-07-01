import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./profileModal";
import { currentUser } from "../services/api-service/user/user";
import Endpoint from "../services/api-service/endpoints";
const Navbuttons = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await currentUser(Endpoint.CURRENT_USER);
        setUser(res);
      } catch (error) {
        console.log("Error while fetching logged in user ", error);
      }
    }
    fetchUser();
  }, []);
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-4 mr-10 relative" ref={dropdownRef}>
      {/* Create Button */}
      <button
        onClick={() => navigate("/upload")}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <FiPlus className="text-lg" />
        <span className="font-medium text-sm">Create</span>
      </button>

      {/* Notification Icon */}
      <button className="p-2 hover:bg-gray-100 rounded-full transition">
        <FiBell className="text-xl" />
      </button>

      {/* Avatar with Modal */}
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-9 h-9 rounded-full overflow-hidden border border-gray-300"
        >
          <img
            src={user?.avatar}
            alt="User avatar"
            className="object-cover w-full h-full"
          />
        </button>

        {open && <ProfileModal user={user} />}
      </div>
    </div>
  );
};

export default Navbuttons;

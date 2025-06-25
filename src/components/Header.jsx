import { FiMenu, FiSearch, FiMic } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Signin from "./Signin";
import Navbuttons from "./Navbuttons";
import { getToken } from "../utils/token";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col pt-2 w-full ">
      {/* Top bar */}
      <div className="flex items-center justify-between py-2 px-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4 ml-2">
          <button className="p-3 rounded-full hover:bg-gray-100">
            <FiMenu className="text-3xl" />
          </button>
          <img
            src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
            alt="YouTube"
            className="w-[120px] h-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Center: Search bar */}
        <div className="flex items-center flex-1 max-w-[800px] mx-10">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-l-full px-4 py-3 text-lg outline-none shadow-sm"
          />
          <button className="px-5 py-4 bg-gray-100 hover:bg-gray-200 border border-l-0 border-gray-300 rounded-r-full">
            <FiSearch className="text-xl" />
          </button>
          <button className="ml-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-full">
            <FiMic className="text-xl" />
          </button>
        </div>

        {/* Right: Sign-in */}
        {getToken() ? <Navbuttons /> : <Signin />}
      </div>
    </header>
  );
};

export default Header;

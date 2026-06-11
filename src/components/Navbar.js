import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useMyContext } from "../store/ContextApi";

const Navbar = () => {
  //handle the header opening and closing menu for the tablet/mobile device
  const [headerToggle, setHeaderToggle] = useState(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  // Access the states by using the useMyContext hook from the ContextProvider
  const { token, setToken, setCurrentUser, isAdmin, setIsAdmin } =
    useMyContext();

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN"); // Updated to remove token from localStorage
    localStorage.removeItem("USER"); // Remove user details as well
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <header className="h-headerHeight z-50 bg-surface-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20 flex items-center sticky top-0">
      <nav className="sm:px-10 px-4 flex w-full h-full items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-vault-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-md transition-all duration-300">
            <span className="text-white font-bold text-sm font-outfit">R</span>
          </div>
          <h3 className="font-outfit text-xl font-bold text-gradient group-hover:opacity-80 transition-opacity duration-300">
            RookVault Notes
          </h3>
        </Link>
        <ul
          className={`lg:static absolute left-0 top-[74px] w-full lg:w-fit lg:px-0 sm:px-10 px-4 lg:bg-transparent bg-surface-950/95 backdrop-blur-xl lg:backdrop-blur-none border-b lg:border-b-0 border-white/[0.06] ${
            headerToggle
              ? "min-h-fit max-h-navbarHeight lg:py-0 py-4 shadow-lg shadow-black/30 lg:shadow-none"
              : "h-0 overflow-hidden "
          }  lg:h-auto transition-all duration-300 font-inter text-surface-300 flex lg:flex-row flex-col lg:gap-1 gap-1`}
        >
          {token && (
            <>
              <Link to="/notes">
                <li
                  className={`${
                    pathName === "/notes"
                      ? "text-vault-400 font-semibold bg-vault-500/10"
                      : ""
                  } py-2 px-4 rounded-lg cursor-pointer hover:text-vault-400 hover:bg-vault-500/5 transition-all duration-200`}
                >
                  My Notes
                </li>
              </Link>
              <Link to="/create-note">
                <li
                  className={`py-2 px-4 rounded-lg cursor-pointer hover:text-vault-400 hover:bg-vault-500/5 transition-all duration-200 ${
                    pathName === "/create-note"
                      ? "text-vault-400 font-semibold bg-vault-500/10"
                      : ""
                  }`}
                >
                  Create Note
                </li>
              </Link>
            </>
          )}

          <Link to="/contact">
            <li
              className={`${
                pathName === "/contact"
                  ? "text-vault-400 font-semibold bg-vault-500/10"
                  : ""
              } py-2 px-4 rounded-lg cursor-pointer hover:text-vault-400 hover:bg-vault-500/5 transition-all duration-200`}
            >
              Contact
            </li>
          </Link>

          <Link to="/about">
            <li
              className={`py-2 px-4 rounded-lg cursor-pointer hover:text-vault-400 hover:bg-vault-500/5 transition-all duration-200 ${
                pathName === "/about"
                  ? "text-vault-400 font-semibold bg-vault-500/10"
                  : ""
              }`}
            >
              About
            </li>
          </Link>

          {token ? (
            <>
              <Link to="/profile">
                <li
                  className={`py-2 px-4 rounded-lg cursor-pointer hover:text-vault-400 hover:bg-vault-500/5 transition-all duration-200 ${
                    pathName === "/profile"
                      ? "text-vault-400 font-semibold bg-vault-500/10"
                      : ""
                  }`}
                >
                  Profile
                </li>
              </Link>{" "}
              {isAdmin && (
                <Link to="/admin/users">
                  <li
                    className={`py-2 px-4 rounded-lg cursor-pointer uppercase text-xs tracking-wider hover:text-vault-400 hover:bg-vault-500/5 transition-all duration-200 ${
                      pathName.startsWith("/admin")
                        ? "text-vault-400 font-semibold bg-vault-500/10"
                        : ""
                    }`}
                  >
                    Admin
                  </li>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="lg:ml-2 w-24 text-center bg-red-500/10 border border-red-500/20 text-red-400 font-semibold px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300"
              >
                LogOut
              </button>
            </>
          ) : (
            <Link to="/signup">
              <li className="lg:ml-2 w-28 text-center vault-btn px-4 py-2 text-white">
                Sign Up
              </li>
            </Link>
          )}
        </ul>
        <span
          onClick={() => setHeaderToggle(!headerToggle)}
          className="lg:hidden block cursor-pointer text-surface-300 hover:text-vault-400 transition-colors duration-200"
        >
          {headerToggle ? (
            <RxCross2 className="text-2xl" />
          ) : (
            <IoMenu className="text-2xl" />
          )}
        </span>
      </nav>
    </header>
  );
};

export default Navbar;

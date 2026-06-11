import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { LiaBlogSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { useMyContext } from "../../store/ContextApi";

const Sidebar = () => {
  // Access the openSidebar and setOpenSidebar function using the useMyContext hook from the ContextProvider
  const { openSidebar, setOpenSidebar } = useMyContext();

  //access the current path
  const pathName = useLocation().pathname;

  return (
    <div
      className={`fixed p-2.5 top-[74px] min-h-[calc(100vh-74px)] max-h-[calc(100vh-74px)] z-20 left-0 bg-surface-950/80 backdrop-blur-xl border-r border-white/[0.06] ${
        openSidebar ? "w-52" : "w-12"
      } transition-all duration-150 flex flex-col gap-4`}
    >
      <div className="min-h-10 max-h-10 flex items-center justify-end px-1">
        {openSidebar ? (
          <button
            className="flex w-full text-surface-400 hover:text-vault-400 justify-end items-center gap-2 text-sm font-semibold transition-colors duration-200"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <span>Close</span>
            <span>
              <FaArrowLeft className="text-xs" />
            </span>
          </button>
        ) : (
          <Tooltip title="Click To Expand">
            <button
              className="flex w-full text-surface-400 hover:text-vault-400 justify-center items-center transition-colors duration-200"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <span>
                <FaArrowRight className="text-base" />
              </span>
            </button>
          </Tooltip>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Tooltip title={`${openSidebar ? "" : "All Users"}`}>
          <Link
            to="/admin/users"
            className={`flex items-center gap-3 min-h-10 max-h-10 py-2 px-3 rounded-lg border transition-all duration-200 ${
              pathName.startsWith("/admin/users")
                ? "bg-vault-500/10 text-vault-400 border-vault-500/20 shadow-glow"
                : "text-surface-300 border-transparent hover:text-vault-400 hover:bg-vault-500/5"
            }`}
          >
            <span>
              <FaUser className="text-base" />
            </span>
            <span
              className={`${
                !openSidebar ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              } transition-all font-semibold duration-150 font-outfit`}
            >
              All Users
            </span>
          </Link>
        </Tooltip>
        <Tooltip title={`${openSidebar ? "" : "Audit Logs"}`}>
          <Link
            to="/admin/audit-logs"
            className={`flex items-center gap-3 min-h-10 max-h-10 py-2 px-3 rounded-lg border transition-all duration-200 ${
              pathName.startsWith("/admin/audit-logs")
                ? "bg-vault-500/10 text-vault-400 border-vault-500/20 shadow-glow"
                : "text-surface-300 border-transparent hover:text-vault-400 hover:bg-vault-500/5"
            }`}
          >
            <span>
              <LiaBlogSolid className="text-lg" />
            </span>
            <span
              className={`${
                !openSidebar ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              } transition-all font-semibold duration-150 font-outfit`}
            >
              Audit Logs
            </span>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;

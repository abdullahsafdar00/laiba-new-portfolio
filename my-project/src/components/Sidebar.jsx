import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Orders", path: "/admin/dashboard/orders" },
  { name: "Messages", path: "/admin/dashboard/messages" },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen p-5 hidden md:block">
      <h2 className="text-2xl font-bold text-indigo-600 mb-10">Admin Panel</h2>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive ? "bg-indigo-500 text-white" : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

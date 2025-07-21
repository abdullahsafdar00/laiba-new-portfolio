import React from "react";

const Header = ({ onLogout }) => {
  return (
    <div className="w-full bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-semibold text-gray-700">Welcome, Laiba421 👋</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Avtar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const email = useSelector((state) => state.reducer.useremail);

  // Toggle dropdown visibility on click
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative inline-block">
      {/* Avatar Image */}
      <div
        className="cursor-pointer w-12 h-12 rounded-full overflow-hidden"
        onClick={toggleDropdown}
      >
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="User Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown (Email) */}
      {isDropdownVisible && (
        <div className="absolute right-0 bg-white shadow-md rounded-lg py-2 px-4 w-48 border border-gray-300">
          <p className="text-sm text-gray-700">{email}</p>
        </div>
      )}

      {/* Hover functionality */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10 m-auto"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      />
    </div>
  );
};

export default Avtar;

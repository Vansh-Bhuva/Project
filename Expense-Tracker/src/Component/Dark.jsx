import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const Dark= () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
      className="sr-only peer"
    />
    <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-gray-500 transition-all relative flex items-center">
      {/* Moving Slider with Centered Icon */}
      <span
        className={`absolute w-5.5 h-5.5 flex items-center justify-center bg-white rounded-full shadow-md transform transition-all ${
          darkMode ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {darkMode ? (
          <Moon className="w-4 h-4 text-gray-900" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </span>
    </div>
  </label>
  );
};

export default Dark;

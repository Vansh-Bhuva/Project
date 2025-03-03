import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon library
import { useLocation } from "react-router-dom";
import Logout from "./Logout";
import Dark from "./Dark";
import Avtar from "./Avtar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-700 dark:text-yellow-300 dark:shadow-2xl  p-4 border-gray shadow-md ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ExpenseTracker
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="mt-2">
            <Link
              to="/"
              className={`hover:text-gray-300 ${
                location.pathname == "/"
                  ? "text-black dark:text-amber-300"
                  : "text-gray-500"
              } `}
            >
              Home
            </Link>
          </li>
          <li className="mt-2">
            <Link
              to="/add-expense"
              className={` hover:text-gray-300 ${
                location.pathname == "/add-expense"
                  ? "text-black dark:text-amber-300"
                  : "text-gray-500"
              } `}
            >
              Add Transaction
            </Link>
          </li>
          <li className="mt-2">
            <Link
              to="/reports"
              className={` hover:text-gray-300 ${
                location.pathname == "/reports"
                  ? "text-black dark:text-amber-300"
                  : "text-gray-500"
              } `}
            >
              Reports
            </Link>
          </li>
          <li>
            <Avtar
            />
          </li>
          <li>
            <Logout />
          </li>
          <li className="mt-2">
            <Dark />
          </li>
          
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white p-4 dark:bg-gray-700 dark:text-yellow-300">
          <li>
            <Link
              to="/"
              className="block py-2 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-expense"
              className="block py-2 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              Add Expense
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="block py-2 hover:text-purple-600"
              onClick={() => setIsOpen(false)}
            >
              Reports
            </Link>
          </li>
          <li className="mt-2 mb-4">
            <Logout />
          </li>
          <li className="mt-4 mb-2">
            <Dark />
          </li>
          <li>
            <Avtar
            />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

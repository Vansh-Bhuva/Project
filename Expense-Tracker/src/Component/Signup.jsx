import { useDispatch } from "react-redux";
import authService from "../firebase/Auth";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../app/expnseSlice";
import { useState } from "react";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const singup = async (data) => {
    if (data.password === data.confirmpwd) {
      if (data.password >= 6) {
        await authService.createAccount(data.email, data.password);
        dispatch(login());
        navigate("/");
      } else {
        setError(() => "Password must be at least 6 characters");
      }
    } else {
      setError(() => "Password doesn't match");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(singup)} className="mt-6 space-y-6">
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("email", { required: true })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-2">
              <Input
                type="password"
                placeholder="Enter a strong password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("password", { required: true })}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <Input
                type="password"
                placeholder="Re-enter your password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("confirmpwd", { required: true })}
              />
            </div>
          </div>

          {/* Register Button */}
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </Button>
            <div className="text-red-600 m-2">{error !== "" && error}</div>
          </div>

          {/* Divider */}
          {/* <div className="relative flex items-center justify-center">
            <span className="absolute bg-white px-4 text-gray-500">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div> */}
        </form>

        {/* Already have an account? */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/Login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

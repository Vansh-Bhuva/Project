import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../firebase/Auth";
import { useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../app/expnseSlice";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const signin = async (data) => {
    try {
      const user = await authService.Login(data.email, data.password);
      if (user) {
        authService.getCurrentUser().then((userData) => {
          if (userData) {
            dispatch(login({ id: user.uid, email: user.email }));
            navigate("/");
          }
        });
      } else {
        setError(() => "Invalid Credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white  shadow-lg rounded-lg p-8">
          <h2 className="text-center text-3xl font-extrabold text-black">
            Login
          </h2>

          <form onSubmit={handleSubmit(signin)} className="mt-6 space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:ring-white"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                {/* <Link to="/ForgotPassword"
                >
                  Forgot password?
                </Link> */}
              </div>
              <div className="mt-2">
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg  focus:ring-black "
                  {...register("password", { required: true })}
                />
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-300"
              >
                Sign in
              </Button>
              <div className="text-red-600 m-2">{error !== "" && error}</div>
            </div>

            {/* Divider */}
            {/* <div className="relative flex items-center justify-center">
              <span className="absolute bg-gray-800 px-4 text-white">or</span>
              <div className="w-full border-t border-gray-300"></div>
            </div> */}
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-black">
            Don't have an account?{"  "}
            <Link to="/Signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

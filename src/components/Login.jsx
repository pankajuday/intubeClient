import { useForm } from "react-hook-form";
// import { loginUser } from "../axios"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "@/Redux/Slices/Auth";
import SpringLoader from "./SpringLoader";
import CookiePermission from "./Permission/CookiePermission";
import { useDebounceClick } from "@/Hooks/useDebounceClick";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData, authIsLoading, authError } = useSelector(
    (state) => state.auth
  );




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useDebounceClick(async (data) => {
    try {
      dispatch(fetchLogin(data)).then((result) => {
        
        if (result?.payload?.user) navigate("/");
      }).catch((err) => {
        return err
        
      });;
      
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.status === 404) alert(error.message);
    }
    
  }, 500);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      {/* Cookie permission notification - will only show when third-party cookies are blocked */}
      <CookiePermission />

      {authIsLoading ? (
        <div className="absolute flex justify-center items-center bg-slate-950 opacity-50 h-full w-full">
          <SpringLoader />
        </div>
      ) : (
        " "
      )}
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Login</h2>
            <p className="text-gray-600 text-sm">
              Enter your username and password to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                {/* <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a> */}
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Login
              </button>
              {/* <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full"
                type="button"
              >
                Login with Google
              </button> */}
            </div>
            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <a
                className="font-bold text-blue-500 hover:text-blue-800"
                href="/signup"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../axios";
import SpringLoader from "./SpringLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "@/Redux/Slices/Auth";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData, authIsLoading, error } = useSelector((state) => state.auth);


 useEffect(() => {
   
    const performLogout = async () => {
      try {
        await dispatch(fetchLogout()).unwrap();
        dispatch({ type: "RESET" });

        navigate("/login");
      } catch (err) {
        console.error("Error logging out:", err);
        dispatch({ type: "RESET" });
        navigate("/login");
      }
    };

    performLogout();

    // No cleanup needed for this approach
  }, [dispatch, navigate]);


  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-slate-950 opacity-60">
      {authIsLoading ? <SpringLoader /> : ""}
      {error ? <div className="h-20 w-40 bg-red-500">{error.message}</div> : ""}
    </div>
  );
};

export default Logout;

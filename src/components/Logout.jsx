import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../axios";
import SpringLoader from "./SpringLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "@/Redux/slices/Auth/auth";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    let isMounted = true;

    try {
      if (isMounted) {
        dispatch(fetchLogout()).then(() => {
          navigate("/login");
        });
      }
    } catch (err) {
      if (isMounted) {
        console.error("Error logging out:", err);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-slate-950 opacity-60">
      {loading ? <SpringLoader /> : ""}
      {error ? <div className="h-20 w-40 bg-red-500">{error.message}</div> : ""}
    </div>
  );
};

export default Logout;

import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error || "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
      <p className="text-xl text-gray-700 mt-4">{error}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Home
      </button>
      <button 
        onClick={() => navigate(-1)} // Go back to previous page
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Back
      </button>

    </div>
  );
};

export default ErrorPage;

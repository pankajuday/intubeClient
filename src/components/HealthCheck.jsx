import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"

function HealthCheck() {
  const [health, setHealth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/healthcheck`,{ withCredentials: true }
        );
        if (response.data) {
          setHealth(response.data);
        } else {
          console.error("Unexpected response data:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchHealth()
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Link to={"/healthcheck"}>
        <div className="healthcheck">{health.message}</div>
      </Link>
    </div>
  );
}

export default HealthCheck;

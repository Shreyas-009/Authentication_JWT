import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(
          "https://authentication-jwt-backend.vercel.app/protected",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile. Please try logging in again.");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="mt-4 text-blue-400 hover:underline">
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>
      )}
      <Link to="/" className="mt-6 inline-block text-blue-400 hover:underline">
        Back to Register
      </Link>
    </div>
  );
};

export default Dashboard;

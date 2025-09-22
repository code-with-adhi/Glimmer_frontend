import React, { useState, useEffect } from "react";
import { getMe } from "../services/apiService";
import type { User } from "../services/apiService";

function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once when the component first loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // The empty array [] means this effect runs only once on mount

  if (loading) {
    return <div className="p-8">Loading your profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      {user && (
        <h1 className="text-3xl font-bold">Welcome back, {user.firstName}!</h1>
      )}
      <p className="mt-4">This is your protected home page.</p>
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from "react";
import { getMe } from "../services/apiService";
import type { User } from "../services/apiService";
import { Link } from "react-router-dom"; // <-- Import Link

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading Profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
        {user && (
          <div>
            <div className="mb-2">
              <span className="font-bold">First Name:</span> {user.firstName}
            </div>
            <div className="mb-2">
              <span className="font-bold">Email:</span> {user.email}
            </div>
            <div className="mb-2">
              <span className="font-bold">Bio:</span>{" "}
              {user.profile?.bio || "No bio set."}
            </div>
          </div>
        )}
        {/* This is the updated part, changing a button to a Link */}
        <Link
          to="/profile/edit"
          className="block text-center mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;

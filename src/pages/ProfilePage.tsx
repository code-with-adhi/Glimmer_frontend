import React, { useState, useEffect } from "react";
import { getMe } from "../services/apiService";
import type { User } from "../services/apiService";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Re-fetch data when the page is focused to show updates
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading Profile...</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
        {user && (
          <div>
            <div className="mb-2">
              <span className="font-bold">Name:</span> {user.firstName}
            </div>
            <div className="mb-4">
              <span className="font-bold">Bio:</span>{" "}
              {user.profile?.bio || "No bio set."}
            </div>

            {/* --- NEW SECTION to display Top Picks --- */}
            <div>
              <h2 className="text-xl font-semibold mb-2">My Top Picks</h2>
              <div className="flex flex-wrap gap-2">
                {user.topPicks && user.topPicks.length > 0 ? (
                  user.topPicks.map((userPick) => (
                    <span
                      key={userPick.id}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                    >
                      {userPick.topPick.name}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No top picks added yet.</p>
                )}
              </div>
            </div>
            {/* ----------------------------------------- */}
          </div>
        )}
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

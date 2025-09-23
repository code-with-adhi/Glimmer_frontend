import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMe,
  updateProfile,
  getTopPicksByCategory,
  addUserTopPick,
  removeUserTopPick,
} from "../services/apiService";
import type { User, TopPick, UserTopPick } from "../services/apiService";

function EditProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  // State for managing Top Picks
  const [availablePicks, setAvailablePicks] = useState<TopPick[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("MUSIC_ARTIST");

  // Fetch initial user data and available picks
  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await getMe();
        setUser(userRes.data);
        setBio(userRes.data.profile?.bio || "");

        const picksRes = await getTopPicksByCategory(selectedCategory);
        setAvailablePicks(picksRes.data);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedCategory]); // Re-fetch when category changes

  const handleBioSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile({ bio });
      alert("Bio updated successfully!");
      navigate("/profile");
    } catch (error) {
      alert("Failed to update bio.");
    }
  };

  const handleAddTopPick = async (topPickId: number) => {
    try {
      await addUserTopPick(topPickId);
      // Refresh user data to show the new pick
      const userRes = await getMe();
      setUser(userRes.data);
    } catch (error) {
      alert("Failed to add Top Pick. Maybe you already have it?");
    }
  };

  const handleRemoveTopPick = async (userTopPickId: number) => {
    try {
      await removeUserTopPick(userTopPickId);
      // Refresh user data
      const userRes = await getMe();
      setUser(userRes.data);
    } catch (error) {
      alert("Failed to remove Top Pick.");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        {/* Bio Edit Form */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Bio</h2>
        <form onSubmit={handleBioSubmit}>
          <textarea
            className="shadow border rounded w-full py-2 px-3 h-32"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          >
            Save Bio
          </button>
        </form>

        <hr className="my-8" />

        {/* Top Picks Management Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Manage Your Top Picks
        </h2>

        {/* Your Current Picks */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">My Picks:</h3>
          <div className="flex flex-wrap gap-2">
            {user?.topPicks?.map((pick) => (
              <div
                key={pick.id}
                className="flex items-center bg-blue-100 rounded"
              >
                <span className="text-blue-800 text-sm font-medium px-2.5 py-0.5">
                  {pick.topPick.name}
                </span>
                <button
                  onClick={() => handleRemoveTopPick(pick.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Picks */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Add a Pick:</h3>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedCategory("MUSIC_ARTIST")}
              className={`px-3 py-1 rounded ${
                selectedCategory === "MUSIC_ARTIST"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Music
            </button>
            <button
              onClick={() => setSelectedCategory("MOVIE")}
              className={`px-3 py-1 rounded ${
                selectedCategory === "MOVIE"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setSelectedCategory("SPORT_TEAM")}
              className={`px-3 py-1 rounded ${
                selectedCategory === "SPORT_TEAM"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Sports
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {availablePicks.map((pick) => (
              <button
                key={pick.id}
                onClick={() => handleAddTopPick(pick.id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded"
              >
                + {pick.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;

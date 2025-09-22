import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, updateProfile } from "../services/apiService";

function EditProfilePage() {
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the current user's profile data to pre-fill the form
  useEffect(() => {
    const fetchCurrentProfile = async () => {
      try {
        const response = await getMe();
        setBio(response.data.profile?.bio || "");
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProfile({ bio });
      alert("Profile updated successfully!");
      navigate("/profile"); // Go back to the profile page
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bio"
            >
              Your Bio
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;

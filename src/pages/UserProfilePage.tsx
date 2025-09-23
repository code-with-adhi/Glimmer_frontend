import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, likeUser } from "../services/apiService";
import type { User } from "../services/apiService";

function UserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await getUserById(userId);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleLike = async () => {
    if (!userId) return;
    try {
      await likeUser(userId);
      alert(`You liked ${user?.firstName}!`);
      // Navigate back to the discovery feed after liking
      navigate("/");
    } catch (error) {
      alert("Failed to like user.");
    }
  };

  if (loading) return <p className="p-8 text-center">Loading profile...</p>;
  if (!user) return <p className="p-8 text-center">User not found.</p>;

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {user.firstName},{" "}
          <span className="font-light">{calculateAge(user.dateOfBirth)}</span>
        </h1>
        <p className="text-gray-600">{user.profile?.bio || "No bio yet."}</p>
        <div className="mt-6">
          <button
            onClick={handleLike}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Like
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;

import React from "react";
import { User } from "../services/apiService";

interface ProfileCardProps {
  user: User;
  score: number; // <-- Add score prop
}

function ProfileCard({ user, score }: ProfileCardProps) {
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

  const getScoreColor = (score: number) => {
    if (score > 75) return "bg-green-500 text-white";
    if (score > 50) return "bg-yellow-400 text-gray-800";
    return "bg-gray-300 text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto transition-transform duration-300 hover:scale-105">
      <div className="relative">
        {/* Placeholder for user image */}
        <div className="h-48 bg-gray-200"></div>
        <div
          className={`absolute top-2 right-2 px-3 py-1 text-sm font-bold rounded-full ${getScoreColor(
            score
          )}`}
        >
          {Math.round(score)}% Match
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
          {user.firstName},{" "}
          <span className="font-light">{calculateAge(user.dateOfBirth)}</span>
        </h2>
        <p className="text-gray-600 mt-1 truncate">
          {user.profile?.bio || "No bio yet."}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;

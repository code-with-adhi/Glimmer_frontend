import React, { useState, useEffect } from "react";
import { getDiscoveryFeed } from "../services/apiService";
import type { UserDiscoveryDTO } from "../services/apiService";
import ProfileCard from "../components/ProfileCard";
import { Link } from "react-router-dom";

function HomePage() {
  const [feed, setFeed] = useState<UserDiscoveryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await getDiscoveryFeed();
        setFeed(response.data);
      } catch (err) {
        setError("Failed to fetch discovery feed.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Finding people near you...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Discover People You Might Like
      </h1>
      {feed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {feed.map((feedItem) => (
            <Link to={`/users/${feedItem.user.id}`} key={feedItem.user.id}>
              <ProfileCard
                user={feedItem.user}
                score={feedItem.compatibilityScore}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          That's everyone for now! Check back later.
        </p>
      )}
    </div>
  );
}

export default HomePage;

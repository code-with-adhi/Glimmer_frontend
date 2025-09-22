import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-gray-300"
          >
            Glimmer
          </Link>
          <div>
            {token ? (
              // If logged in, show Profile and Logout
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              // If logged out, show Login and Register
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Login
                </Link>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

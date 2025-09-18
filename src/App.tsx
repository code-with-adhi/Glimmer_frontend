import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Import the useAuth hook

function App() {
  const { token, logout } = useAuth(); // Get token and logout function from context

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            Glimmer
          </Link>
          <div>
            {token ? (
              // If logged in, show a Logout button
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            ) : (
              // If logged out, show Login and Register links
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

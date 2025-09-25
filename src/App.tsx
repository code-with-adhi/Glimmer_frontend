import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token, logout } = useAuth();

  return (
    <div>
      <nav className="app-nav">
        <div
          className="app-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#ad1457",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Glimmer 💕
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {token ? (
              <>
                <Link
                  to="/profile"
                  style={{
                    color: "#6d1b7b",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="button button-secondary"
                  style={{ width: "auto", padding: "0.5rem 1rem" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: "#6d1b7b",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    color: "#6d1b7b",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

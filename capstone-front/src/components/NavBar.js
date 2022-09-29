import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <button
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
        </button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {isAuthenticated && (
                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/external-api">External API</Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
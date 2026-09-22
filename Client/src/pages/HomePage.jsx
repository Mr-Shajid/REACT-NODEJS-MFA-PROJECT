import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../service/authApi";

const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useSession();

    const handleLogout = async() => {
        try {
            await logoutUser();
            logout();
            navigate("/login");
        } catch (error) {
            console.log("Eroor: ", error.message);
        }
    }

    return (
        <div className ="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Welcome , {user.username}</h2>
            <p className="text-gray-600">You have successfully logged in and verified your 2FA.</p>
            <button onClick={handleLogout} type="button" className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};


export default HomePage;
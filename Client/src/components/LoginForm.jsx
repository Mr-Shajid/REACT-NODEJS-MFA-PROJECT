import { Link } from "react-router-dom";
import React, { useState } from "react";
import {register, loginUser} from  "../service/authApi";

const LoginForm = ({onLogingSuccess}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await loginUser(username, password);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            setError("");
            onLogingSuccess(data);
        }
        catch (error) {
            console.log("The err is : ", error.message);
            setUsername("");
            setPassword("");
            setError("Invalid login credentials");
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const {data} = await register(username, password);
            setIsRegister(false);
            setMessage(data.message);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setError("");
        }
        catch (error) {
            console.log("The err is : ", error.message);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setMessage("");
            setError("something went wrong during user registration");
        }
    }

    const handleRegisterToggle = (e) => {
        e.preventDefault();
        setIsRegister(!isRegister);
        setError("");
        setMessage("");
    }


    return (
        <form onSubmit= {isRegister ? handleRegister : handleLogin} 
        className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto" action="">
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">{isRegister ? "Create Account" : "Login"}</h2>
            </div>
            <hr className="text-gray-200 mt-6 mb-6"/>
            <p className="text-center text-gray-600 text-lg font-light">
                {isRegister ? "Looks like you are new here" : "We are glad to see you agian!"}
            </p>
            <div className="p-6">
                <div className= "mb-4">
                    <label className="text-gray-600 text-sm">Username</label>
                    <input label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded mt-2" placeholder="Enter Your Username" required/>
                </div>
                <div className= "mb-4">
                    <label className="text-gray-600 text-sm">Password</label>
                    <input label="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-2" placeholder="Enter Your Password" required/>
                </div>
                {isRegister ? (<div className= "mb-4">
                    <label className="text-gray-600 text-sm">Confirm Password</label>
                    <input label="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mt-2" placeholder="Enter Your Password again" required/>
                </div>) : ("") }
                {error && <p className="text-red-500 text-sm mb-3"> {error} </p>}
                {message && <p className="text-green-500 text-sm mb-3"> {message} </p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">{isRegister ? "Register" : "Login"}</button>
                <div>
                    <p className= "pt-4 text-center text-gray-600 text-sm">{isRegister ? "Already have an account?" : "Don't have an account? "}<Link to="" onClick={handleRegisterToggle}>{isRegister ? " Login" : "Create Account"}</Link></p>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
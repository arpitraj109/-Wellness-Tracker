import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const isValidEmail = /.+@.+\..+/.test(email);
    if (isValidEmail && username && password) {
      localStorage.setItem("user", username);
      localStorage.setItem("username", username);
      localStorage.setItem("userEmail", email);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Please enter a valid email, username, and password");
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Signup Form</h2>

          <div className="mt-6 grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
            <Link to="/login" className="px-4 py-2 rounded-lg text-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Login</Link>
            <button className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium">Signup</button>
          </div>

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-2.5 rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
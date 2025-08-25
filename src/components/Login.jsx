import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const isValidEmail = /.+@.+\..+/.test(email);
    if (isValidEmail && password) {
      // Keep previous username if it exists, otherwise derive from email prefix
      const existingUsername = localStorage.getItem("username");
      const derived = email.split("@")[0];
      const username = existingUsername || derived;
      localStorage.setItem("user", username);
      localStorage.setItem("username", username);
      localStorage.setItem("userEmail", email);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Please enter a valid email and password");
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Login Form</h2>

          <div className="mt-6 grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
            <button className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium">Login</button>
            <Link to="/signup" className="px-4 py-2 rounded-lg text-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Signup</Link>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-sm">
              <a href="#" className="text-pink-600 hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold">Login</button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Not a member?
            <Link to="/signup" className="ml-2 text-pink-600 hover:underline">Signup now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

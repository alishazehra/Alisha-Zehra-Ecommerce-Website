'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    activeUsers: 0,
  });
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    if (typeof window !== "undefined") {
      const userInfo = localStorage.getItem("user");

      if (!userInfo) {
        // If no user data, redirect to signup page
        router.push("/auth/signup");
      } else {
        setUser(JSON.parse(userInfo));
      }

      // Simulate fetching admin stats
      setStats({
        totalUsers: 150,       // Example stat: total users
        totalPosts: 320,       // Example stat: total posts
        activeUsers: 75,       // Example stat: active users in the last month
      });
    }
  }, [router]);

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to signup page
    localStorage.removeItem("user");
    router.push("/auth/signup");
  };

  if (!user) {
    return <div>Loading...</div>; // Show a loading message until user info is available
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Admin Dashboard</h2>

        {/* Welcome Section */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium text-gray-700">Welcome, {user.name}!</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-blue-50 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-blue-700">Total Users</h4>
            <p className="text-2xl font-bold text-blue-800">{stats.totalUsers}</p>
          </div>

          <div className="p-6 bg-green-50 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-green-700">Total Posts</h4>
            <p className="text-2xl font-bold text-green-800">{stats.totalPosts}</p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-yellow-700">Active Users</h4>
            <p className="text-2xl font-bold text-yellow-800">{stats.activeUsers}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h4>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <ul>
              <li className="text-gray-700">User Alisha Zehra signed up</li>
              <li className="text-gray-700">User Neha opened the website</li>
              <li className="text-gray-700">Admin updated the website settings</li>
              <li className="text-gray-700">New user registration from admin dashboard</li>
            </ul>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

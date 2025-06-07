"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    isVerified: false,
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data);
      } catch (error) {
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-600">
              {user.username[0]?.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Account Status</span>
            <span
              className={user.isVerified ? "text-green-600" : "text-red-600"}
            >
              {user.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

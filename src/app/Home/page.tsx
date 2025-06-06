"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-purple-700">
              Event Management System
            </span>
          </div>
          <nav className="space-x-6">
            <a
              href="/Home"
              className="text-gray-700 hover:text-purple-600 font-medium transition"
            >
              Home
            </a>
            <a
              href="/profile"
              className="text-gray-700 hover:text-purple-600 font-medium transition"
            >
              Profile
            </a>
            <a
              href="/settings"
              className="text-gray-700 hover:text-purple-600 font-medium transition"
            >
              Settings
            </a>
            <button
              onClick={logout}
              className="text-gray-700 hover:text-red-500 font-medium transition"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <div>{""}</div>
      {/* Footer */}
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AuthApp. All rights reserved.
          </span>
          <div className="space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

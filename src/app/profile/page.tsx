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
            <span className="text-2xl font-bold text-purple-700">AuthApp</span>
          </div>
          <nav className="space-x-6">
            <a
              href="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition"
            >
              Home
            </a>
            <a
              href="/profile"
              className="text-purple-700 font-semibold border-b-2 border-purple-700"
            >
              Profile
            </a>
            <a
              href="/settings"
              className="text-gray-700 hover:text-purple-600 font-medium transition"
            >
              Settings
            </a>
            <a
              href="/logout"
              className="text-gray-700 hover:text-red-500 font-medium transition"
            >
              Logout
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Profile Page
          </h1>
          <h2>
            {" "}
            {data === "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h2>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {/* Placeholder for avatar */}
              <span>P</span>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Name</h2>
              <p className="text-gray-500">your.email@example.com</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={getUserDetails}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Get user Details
              </button>
              <button
                onClick={logout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>

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

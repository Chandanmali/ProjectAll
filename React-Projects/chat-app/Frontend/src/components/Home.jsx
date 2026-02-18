import { useState } from "react";

import ChatImage from "../components/Voice chat-amico.png"


export default function Home() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-black text-white flex-col justify-center px-16">
        {/* <h1 className="text-5xl font-bold mb-6">Welcome !!</h1> */}

        {/* 3D Chat Image */}
        <div className="flex justify-center">
          <img
            src={ChatImage}
            alt="3D Chat Illustration"
            className="w-137.5 drop-shadow-2xl animate-float"
          />

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 border-red-700 justify-center bg-gray-200">
        <div>
          <div className="text-3xl font-semibold mt-10">
            <h1 className=" border border-gray-300 rounded-2xl shadow-md text-center py-2 px-10">Talk-A-Tive-Web-App</h1>
          </div>


          <div className="mt-15">
            <h2 className="text-3xl font-semibold mb-6">Signup</h2>
          </div>

          <input
            type="email"
            placeholder="Enter your work email"
            className="w-full border rounded-lg px-4 py-2 mb-4"
          />

          <button className="w-full bg-gray-900 text-white py-3 rounded-lg">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

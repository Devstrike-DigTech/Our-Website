"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";

import animationData from "../../public/lottie/teamwork.json"; // Adjust the path to your Lottie file

const Custom404: React.FC = () => {
  const routeName = ""; // Replace with dynamic route if needed

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      {/* Lottie Animation */}
      <div className="w-3/4 max-w-xl">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Text */}
      <h1 className="mt-6 text-2xl font-semibold text-gray-800">
        We&apos;re cooking something amazing for this
        <span className="text-blue-600 font-bold">{routeName}</span> page.
      </h1>

      {/* Button */}
      <Link href="/" passHref>
        <button className="mt-6 px-6 py-3 text-lg font-medium text-white bg-gradient-to-b from-primary to-[#353B77] hover:from-[#353B77] hover:to-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default Custom404;

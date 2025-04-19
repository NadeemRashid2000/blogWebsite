import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      {/* Header Image */}
      <img 
        src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Blog Banner"
        className="w-280 max-h-128 object-cover rounded-lg shadow-lg mb-6"
      />

      {/* About Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        About My Blog
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center leading-relaxed">
        My Blog is a modern and responsive blogging platform built using{" "}
        <strong>React and Tailwind CSS</strong>. It allows users to{" "}
        <strong>read, explore content</strong> on various
        topics.
      </p>

      {/* Key Features */}
      <div className="mt-8 text-left max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
           Key Features:
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>
             <strong>User-Friendly Interface</strong> – Clean and simple
            design.
          </li>
        </ul>
      </div>

    </div>
  );
};

export default About;

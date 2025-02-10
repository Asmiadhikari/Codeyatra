"use client";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { IoPersonAdd } from "react-icons/io5";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-r from-green-500 via-teal-600 to-indigo-700 text-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 w-full bg-opacity-60 backdrop-blur-md shadow-lg py-4 px-6 flex justify-between items-center z-50">
        <div className="flex items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src="/src/assets/viber_image_2025-02-09_23-01-19-583.png"
              alt="Rescuing Leftover Cuisine Logo"
              width={150}
              height={80}
              className="h-12 w-auto"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <button
            className="text-white hover:text-gray-300 transition font-medium text-lg"
            onClick={() => navigate("./login")}
          >
            Login
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => navigate("./SignUp")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-20 flex flex-col justify-center items-center text-center px-8 mt-40">
        <h1 className="text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl animate__animated animate__fadeInUp">
          Rescuing Surplus Food, One Meal at a Time
        </h1>
        <p className="mt-4 text-xl text-gray-100 max-w-3xl leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
          Join us in creating a sustainable future by reducing food waste and
          helping those in need. Every meal saved is a step towards a brighter
          tomorrow.
        </p>

        <div className="mt-8">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold shadow-xl transition duration-300 ease-in-out transform hover:scale-105 text-xl"
            onClick={() => navigate("./SignUp")} // Navigate to SignUp page
          >
            Make a Difference Today →
          </button>
        </div>
      </main>

      {/* Impact Section */}
      <section className="mt-20 w-full flex flex-col items-center text-center px-8 py-16 bg-white text-gray-800 shadow-lg rounded-t-3xl">
        <h2 className="text-4xl font-bold mb-6 text-teal-800">Our Impact</h2>
        <p className="text-lg max-w-2xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
          With your help, we have rescued over{" "}
          <span className="font-semibold text-green-700">10,000 meals</span> and
          distributed them to those in need. Together, we are reducing waste and
          fighting hunger!
        </p>
        <div className="flex flex-wrap justify-center gap-8 animate__animated animate__fadeIn animate__delay-2s">
          <div className="p-6 bg-green-100 rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-green-800">10,000+</h3>
            <p className="text-gray-600">Meals Rescued</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-yellow-800">500+</h3>
            <p className="text-gray-600">Donors</p>
          </div>
          <div className="p-6 bg-teal-100 rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold text-teal-800">200+</h3>
            <p className="text-gray-600">Communities Helped</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full flex flex-col items-center text-center px-8 py-16 bg-gray-100 text-gray-800 shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-teal-800">How It Works</h2>
        <p className="text-lg max-w-2xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Rescuing surplus food and getting it to those who need it has never
          been easier. Here&apos;s how you can be a part of the solution:
        </p>
        <div className="flex flex-wrap justify-center gap-12 animate__animated animate__fadeIn animate__delay-2s">
          <div className="p-8 bg-white rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <GiMeal className="text-6xl text-green-800 mb-4" />
            <h3 className="text-2xl font-semibold text-green-800">
              1. Register
            </h3>
            <p className="text-gray-600">Sign up as a donor or recipient.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <IoPersonAdd className="text-6xl text-yellow-800 mb-4" />
            <h3 className="text-2xl font-semibold text-yellow-800">
              2. Post or Request
            </h3>
            <p className="text-gray-600">
              Donors list surplus food, and recipients find what they need.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <BsFillCheckCircleFill className="text-6xl text-teal-800 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-800">
              3. Match & Pick Up
            </h3>
            <p className="text-gray-600">
              We connect donors with recipients for efficient food distribution.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-md w-64 transform hover:scale-105 transition duration-300 ease-in-out">
            <GiMeal className="text-6xl text-red-800 mb-4" />
            <h3 className="text-2xl font-semibold text-red-800">
              4. Reduce Waste
            </h3>
            <p className="text-gray-600">
              Every meal saved helps reduce food waste and support communities.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16 text-center">
        <h3 className="text-lg font-semibold">Follow Us</h3>
        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300 ease-in-out"
          >
            <FaFacebook className="text-3xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300 ease-in-out"
          >
            <FaTwitter className="text-3xl" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition duration-300 ease-in-out"
          >
            <FaInstagram className="text-3xl" />
          </a>
          <a
            href="mailto:info@foodrescue.org"
            className="hover:text-yellow-400 transition duration-300 ease-in-out"
          >
            <FaEnvelope className="text-3xl" />
          </a>
        </div>

        {/* Quick Navigation Links */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-gray-400">
          <a href="/" className="hover:text-white transition duration-300">
            Home
          </a>
          <a href="/about" className="hover:text-white transition duration-300">
            About Us
          </a>
          <a
            href="/contact"
            className="hover:text-white transition duration-300"
          >
            Contact
          </a>
          <a href="/faq" className="hover:text-white transition duration-300">
            FAQ
          </a>
        </div>

        {/* Contact Info */}
        <p className="mt-4 text-gray-400 text-sm">
          📍 Kathmandu, Nepal | 📧 info@foodrescue.org
        </p>

        {/* Copyright */}
        <p className="mt-4 text-gray-500 text-xs">
          © 2025 Rescuing Leftover Cuisine. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

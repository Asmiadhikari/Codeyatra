"use client";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-teal-600 text-white">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-20 w-full max-w-4xl px-6 text-center">
                {/* Header */}
                <header className="flex justify-between items-center w-full py-4 px-6 bg-opacity-50 backdrop-blur-md rounded-lg shadow-md">
                    <div className="flex items-center">
                        <img
                            src="/src/assets/viber_image_2025-02-09_23-01-19-583.png"
                            alt="Rescuing Leftover Cuisine Logo"
                            width={150}
                            height={80}
                            className="h-12 w-auto"
                        />
                    </div>

                    {/* System Tray */}
                    <div className="flex gap-4">
                        <button className="text-white hover:text-gray-300 transition font-medium" onClick={() => navigate("./login")}>
                            Login
                        </button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold shadow-lg transition" onClick={() => navigate("./signup")}>
                            Sign Up
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="pt-16">
                    <h1 className="text-5xl font-extrabold text-yellow-300 leading-tight mb-6 drop-shadow-lg">
                        Transforming surplus food into hope, 
                        <span className="bg-white text-green-800 px-4 mx-2 rounded-lg shadow-md">one meal at a time</span>
                    </h1>

                    <p className="mt-4 text-lg text-gray-200">
                        Building resilient food networks to fight hunger and reduce waste.
                    </p>

                    <div className="mt-8">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-lg transition cursor-pointer text-lg">
                            Make a donation today →
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
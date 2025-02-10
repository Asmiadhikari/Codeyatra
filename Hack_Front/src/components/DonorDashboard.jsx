import { useState } from "react";

import { useNavigate } from "react-router-dom"; // Import for navigation

function DonorDashboard() {
  const navigate = useNavigate(); // Hook for redirection

  const [formData, setFormData] = useState({
    foodItem: "",
    quantity: "",
    pickupDate: "",
    pickupTime: "",
    proximity: "",
  });

  const [selectedPage, setSelectedPage] = useState("donateFood");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Assuming donorId is stored in localStorage
    console.log("token", token);
    

    if (!token) {
      alert("Donor ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/food/donate-food",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            token, // Include the donorId in the request body
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Food donation successful!");
        setFormData({
          foodItem: "",
          quantity: "",
          pickupDate: "",
          pickupTime: "",
          proximity: "",
        }); // Reset the form
      } else {
        alert(`Error: ${result.error || "An error occurred."}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Network error. Please try again later.");
    }
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to the home page
  };

  const renderPageContent = () => {
    if (selectedPage === "donateFood") {
      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label
              className="block text-gray-700 font-semibold text-lg"
              htmlFor="foodItem"
            >
              Food Item
            </label>
            <input
              type="text"
              id="foodItem"
              name="foodItem"
              value={formData.foodItem}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter food item"
              required
            />
          </div>

          <div className="space-y-4">
            <label
              className="block text-gray-700 font-semibold text-lg"
              htmlFor="quantity"
            >
              Quantity (kg or units)
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="space-y-4">
            <label
              className="block text-gray-700 font-semibold text-lg"
              htmlFor="pickupDate"
            >
              Pickup Date
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div className="space-y-4">
            <label
              className="block text-gray-700 font-semibold text-lg"
              htmlFor="pickupTime"
            >
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div className="space-y-4">
            <label
              className="block text-gray-700 font-semibold text-lg"
              htmlFor="proximity"
            >
              Proximity (in km)
            </label>
            <input
              type="number"
              id="proximity"
              name="proximity"
              value={formData.proximity}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter proximity in kilometers"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-300 text-lg"
          >
            Submit
          </button>
        </form>
      );
    } else if (selectedPage === "leaderboards") {
      return (
        <div className="text-center text-xl font-semibold text-teal-700">
          Leaderboards will be displayed here.
        </div>
      );
    } else if (selectedPage === "donationHistory") {
      return (
        <div className="text-center text-xl font-semibold text-teal-700">
          Your donation history will be shown here.
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-teal-600 text-white p-8 flex flex-col items-center">
        {/* Single-line heading */}
        <h2 className="text-3xl font-bold text-center mb-6">Donor Dashboard</h2>

        <ul className="w-full">
          <li>
            <button
              className={`w-full text-left py-3 px-6 text-lg rounded-lg focus:outline-none transition duration-300 ${
                selectedPage === "donateFood"
                  ? "bg-teal-700"
                  : "hover:bg-teal-700"
              }`}
              onClick={() => setSelectedPage("donateFood")}
            >
              Donate Food
            </button>
          </li>

          {/* Separator */}
          <hr className="my-4 border-gray-300 w-full" />

          <li>
            <button
              className={`w-full text-left py-3 px-6 text-lg rounded-lg focus:outline-none transition duration-300 ${
                selectedPage === "leaderboards"
                  ? "bg-teal-700"
                  : "hover:bg-teal-700"
              }`}
              onClick={() => setSelectedPage("leaderboards")}
            >
              Check Leaderboards
            </button>
          </li>

          {/* Separator */}
          <hr className="my-4 border-gray-300 w-full" />

          <li>
            <button
              className={`w-full text-left py-3 px-6 text-lg rounded-lg focus:outline-none transition duration-300 ${
                selectedPage === "donationHistory"
                  ? "bg-teal-700"
                  : "hover:bg-teal-700"
              }`}
              onClick={() => setSelectedPage("donationHistory")}
            >
              Donation History
            </button>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full py-3 bg-[#8B322C] text-white font-semibold rounded-lg shadow-lg hover:bg-[#732722] focus:outline-none focus:ring-4 focus:ring-[#5A1D19] transition duration-300 text-lg"
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-8 bg-white shadow-lg rounded-lg">
        {renderPageContent()}
      </div>
    </div>
  );
}

export default DonorDashboard;

import { useState } from "react";

function DonorDashboard() {
  const [formData, setFormData] = useState({
    foodItem: "",
    pickupDate: "",
    pickupTime: "",
    urgency: "Low",
    proximity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Donor Dashboard
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="foodItem">
              Food Item
            </label>
            <input
              type="text"
              id="foodItem"
              name="foodItem"
              value={formData.foodItem}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter food item"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="pickupDate">
              Pickup Date
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="pickupTime">
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="urgency">
              Urgency
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div> */}

          <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="proximity">
              Proximity (in km)
            </label>
            <input
              type="number"
              id="proximity"
              name="proximity"
              value={formData.proximity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter proximity in kilometers"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonorDashboard;

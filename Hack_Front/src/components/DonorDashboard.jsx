import { useState } from "react";

function DonorDashboard() {
  const [formData, setFormData] = useState({
    foodItem: "",
    quantity: "",
    foodType: "Cooked Meal",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Send form data to backend
    try {
      const response = await fetch('http://localhost:5000/api/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert('Error sending data to server');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Donor Dashboard
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Item */}
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

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* Food Type */}
          <div className="space-y-2">
            <label className="block text-gray-700" htmlFor="foodType">
              Food Type
            </label>
            <select
              id="foodType"
              name="foodType"
              value={formData.foodType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Cooked Meal">Cooked Meal</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Bread and Pastries">Bread and Pastries</option>
              <option value="Canned Goods">Canned Goods</option>
            </select>
          </div>

          {/* Pickup Date */}
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

          {/* Pickup Time */}
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

          {/* Proximity */}
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

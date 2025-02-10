import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    userType: "",
    recipientType: "",
    latitude: "",
    longitude: "",
  });

  const [mapCenter, setMapCenter] = useState([27.7172, 85.324]); // Default Kathmandu
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
          setMapCenter([latitude, longitude]);
          setShowMap(true);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your contact number"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Type
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select User Type</option>
              <option value="donor">Donor</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>

          {/* Recipient Type (Only if Receiver) */}
          {formData.userType === "receiver" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient Type</label>
              <select
                name="recipientType"
                value={formData.recipientType}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Recipient Type</option>
                <option value="orphanage">Orphanage</option>
                <option value="shelter">Shelter</option>
                <option value="ngo">NGO</option>
                <option value="poultry farming">Poultry Farming</option>
              </select>
            </div>
          )}

          {/* Location Inputs */}
          <div className="flex space-x-2">
            <input
              name="latitude"
              type="text"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleInputChange}
            />
            <input
              name="longitude"
              type="text"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Use Current Location
            </button>
          </div>

          {/* Map - Only Show After Clicking "Use Current Location" */}
          {showMap && (
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "250px", width: "100%", borderRadius: "10px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={mapCenter}
                icon={markerIcon}
                draggable={true} // Allow dragging
                eventHandlers={{
                  dragend: (e) => {
                    const { lat, lng } = e.target.getLatLng();
                    setFormData((prevState) => ({
                      ...prevState,
                      latitude: lat.toFixed(6),
                      longitude: lng.toFixed(6),
                    }));
                    setMapCenter([lat, lng]); // Move marker to new position
                  },
                }}
              >
                <Popup>Drag to select your location</Popup>
              </Marker>
            </MapContainer>
          )}

          {/* Location Inputs */}
          <div className="flex space-x-2">
            <input
              name="latitude"
              type="text"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleInputChange}
            />
            <input
              name="longitude"
              type="text"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Use Current Location
            </button>
          </div>

          {/* Map - Only Show After Clicking "Use Current Location" */}
          {showMap && (
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "250px", width: "100%", borderRadius: "10px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={mapCenter}
                icon={markerIcon}
                draggable={true} // Allow dragging
                eventHandlers={{
                  dragend: (e) => {
                    const { lat, lng } = e.target.getLatLng();
                    setFormData((prevState) => ({
                      ...prevState,
                      latitude: lat.toFixed(6),
                      longitude: lng.toFixed(6),
                    }));
                    setMapCenter([lat, lng]); // Move marker to new position
                  },
                }}
              >
                <Popup>Drag to select your location</Popup>
              </Marker>
            </MapContainer>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md bg-teal-900 text-white">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

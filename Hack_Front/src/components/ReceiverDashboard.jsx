import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// Define custom icons
const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ReceiverDashboard = () => {
  const navigate = useNavigate();
  const [filterDistance, setFilterDistance] = useState(5);
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewHistory, setViewHistory] = useState(false);
  const [viewNotifications, setViewNotifications] = useState(false);

  const userLocation = { lat: 27.7, lng: 85.3333 }; // Dummy user location

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donors");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        setError(`Failed to fetch donors: ${error.message}`);
      }
    };

    fetchDonors();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const handleAvailableClick = (id, latitude, longitude) => {
    setSelectedLocation({ lat: latitude, lng: longitude });
  };
  const handleRequestHistory = () => {
    setViewHistory(true);
    setViewNotifications(false);
    setSelectedLocation(false);
  };

  const handleNotifications = () => {
    setViewNotifications(true);
    setViewHistory(false);
    setSelectedLocation(false);
  };

  const filteredDonors = donors.filter((donor) => {
    const distance = getDistance(
      userLocation.lat,
      userLocation.lng,
      donor.latitude,
      donor.longitude
    );
    return distance <= filterDistance;
  });

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-teal-700 text-white p-8 flex flex-col items-center shadow-lg justify-between">
        <h2 className="text-3xl font-bold text-center mb-6">
          Receiver Dashboard
        </h2>
        <ul className="w-full mb-auto">
          <li>
            <button
              className="w-full text-left py-3 px-6 text-lg rounded-lg hover:bg-teal-700"
              onClick={() => {
                setViewHistory(false);
                setViewNotifications(false);
              }}
            >
              View Donors
            </button>
          </li>
          <hr className="my-4 border-gray-300 w-full" />
          <li>
            <button
              className="w-full text-left py-3 px-6 text-lg rounded-lg hover:bg-teal-700"
              onClick={handleRequestHistory}
            >
              Request History
            </button>
          </li>
          <hr className="my-4 border-gray-300 w-full" />
          <li>
            <button
              className="w-full text-left py-3 px-6 text-lg rounded-lg hover:bg-teal-600"
              onClick={handleNotifications}
            >
              Notifications
            </button>
          </li>
          <hr className="my-4 border-gray-300 w-full" />
        </ul>
        <button
          onClick={handleLogout}
          className="mt-auto w-full py-3 bg-[#8B322C] text-white font-semibold rounded-lg shadow-lg hover:bg-[#732722] transition duration-300 text-lg"
        >
          Logout
        </button>
      </div>

      <div className="w-3/4 p-8">
        {!viewHistory && !viewNotifications && (
          <div className="mb-6">
            <label htmlFor="filter-distance" className="mr-4 font-medium">
              Filter by Distance:
            </label>
            <select
              id="filter-distance"
              value={filterDistance}
              onChange={(e) => setFilterDistance(Number(e.target.value))}
              className="p-2 border-2 border-teal-600 rounded-lg"
            >
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
              <option value="50">50 km</option>
            </select>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6">Available Donations</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : viewHistory ? (
          <div>
            <h2 className="text-center text-2xl font-semibold mb-6">
              Request History
            </h2>
            <p>No request history yet.</p>
          </div>
        ) : viewNotifications ? (
          <div>
            <h2 className="text-center text-2xl font-semibold mb-6">
              Notifications
            </h2>
            <p>No new notifications.</p>
          </div>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-teal-600 text-white text-left">
                <th className="py-3 px-6">Donor Name</th>
                <th className="py-3 px-6">Food Type</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Contact Number</th>
                <th className="py-3 px-6">Available Until</th>
                <th className="py-3 px-6">Proximity</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor) => (
                  <tr key={donor.id} className="border-b">
                    <td className="py-4 px-6">{donor.name}</td>
                    <td className="py-4 px-6">{donor.foodType}</td>
                    <td className="py-4 px-6">{donor.quantity}</td>
                    <td className="py-4 px-6">
                      {donor.location || "Location not available"}
                    </td>
                    <td className="py-4 px-6">{donor.contactNumber}</td>
                    <td className="py-4 px-6">{donor.availableUntil}</td>
                    <td className="py-4 px-6 font-bold">{donor.proximity}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() =>
                          handleAvailableClick(
                            donor.id,
                            donor.latitude,
                            donor.longitude
                          )
                        }
                        className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-500 transition duration-300"
                      >
                        Available
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No donors available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedLocation && (
        <div className="w-full h-96 mt-8">
          <h3 className="text-xl font-semibold mb-4">Donor Location</h3>
          <MapContainer
            center={[
              selectedLocation
                ? (selectedLocation.lat + userLocation.lat) / 2
                : userLocation.lat,
              selectedLocation
                ? (selectedLocation.lng + userLocation.lng) / 2
                : userLocation.lng,
            ]}
            zoom={13}
            style={{ width: "100%", height: "400px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={blueIcon}
            >
              <Popup>You are here (Dummy Location)</Popup>
            </Marker>

            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={redIcon}
            >
              <Popup>Donor Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default ReceiverDashboard;

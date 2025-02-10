// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState("");
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     location: "",
//     contact: "",
//     recipientType: "",
//     latitude: "",
//     longitude: "",
//   });
//   const [isSuccess, setIsSuccess] = useState(false); // State for success message
//   const [isLoading, setIsLoading] = useState(false); // To simulate loading

//   const handleUserTypeChange = (event) => {
//     setUserType(event.target.value);
//     setFormData((prevState) => ({ ...prevState, recipientType: "" }));
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData((prevState) => ({
//             ...prevState,
//             latitude: latitude,
//             longitude: longitude,
//             location: `Lat: ${latitude}, Lon: ${longitude}`,
//           }));
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form submitted:", { ...formData, userType });
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsSuccess(true); // Set success to true after form submission
//       setIsLoading(false);

//       // Hide the success message after 3 seconds
//       setTimeout(() => {
//         setIsSuccess(false);
//       }, 3000);
//     }, 1000);
//     navigate("/login");
//     // Simulate some loading time before success
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
//       {/* Success Message Popup */}
//       {isSuccess && (
//         <div className="absolute top-0 left-0 right-0 z-50 flex justify-center items-center bg-green-500 text-white p-4 rounded-md shadow-lg">
//           <span>Signup successful! Redirecting to login...</span>
//         </div>
//       )}

//       <div
//         className={`max-w-md w-full bg-white p-6 rounded-lg shadow-md ${
//           isSuccess ? "blur-sm" : ""
//         }`}
//       >
//         <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
//           Sign Up
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex justify-center space-x-4 pb-4">
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio"
//                 name="userType"
//                 value="donor"
//                 checked={userType === "donor"}
//                 onChange={handleUserTypeChange}
//               />
//               <span className="ml-2">Donor</span>
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 className="form-radio"
//                 name="userType"
//                 value="receiver"
//                 checked={userType === "receiver"}
//                 onChange={handleUserTypeChange}
//               />
//               <span className="ml-2">Receiver</span>
//             </label>
//           </div>

//           {userType && (
//             <>
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="location"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Location
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     id="location"
//                     name="location"
//                     type="text"
//                     required
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
//                     placeholder="Enter your location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                   />
//                   <button
//                     type="button"
//                     onClick={getCurrentLocation}
//                     className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm"
//                   >
//                     Use Current Location
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="contact"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Contact
//                 </label>
//                 <input
//                   id="contact"
//                   name="contact"
//                   type="tel"
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter your contact number"
//                   value={formData.contact}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               {userType === "receiver" && (
//                 <div>
//                   <label
//                     htmlFor="recipientType"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Recipient Type
//                   </label>
//                   <select
//                     id="recipientType"
//                     name="recipientType"
//                     required
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     value={formData.recipientType}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Recipient Type</option>
//                     <option value="orphanage">Orphanage</option>
//                     <option value="shelter">Shelter</option>
//                     <option value="ngo">NGO</option>
//                     <option value="poultry farming">Poultry Farming</option>
//                   </select>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-sm font-medium ${
//                   !userType || isLoading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 disabled={!userType || isLoading}
//               >
//                 {isLoading ? "Signing Up..." : "Sign Up"}
//               </button>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;




import  { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
const SignUp = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    userType: "",
    recipientType: "",
  });
 
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        alert("Signup successful!");
        navigate("./login")
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Signup failed", error);
      setIsLoading(false);
    }
  };

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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your contact number"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Recipient Type</option>
                <option value="orphanage">Orphanage</option>
                <option value="shelter">Shelter</option>
                <option value="ngo">NGO</option>
                <option value="poultry farming">Poultry Farming</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-900 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-sm font-medium ${
              !formData.userType || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!formData.userType || isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
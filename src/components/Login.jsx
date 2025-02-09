import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const navigate = useNavigate(); // Hook to navigate
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login submitted:", formData);

    // Simulate successful login
    if (
      formData.email === "user@example.com" &&
      formData.password === "password"
    ) {
      setShowErrorMessage(false); // Hide error message on success
      setTimeout(() => {
        navigate("/donorDashboard"); // Redirect after successful login
      }, 1000);
    } else {
      setShowErrorMessage(true); // Show error if login fails
      setTimeout(() => {
        setShowErrorMessage(false); // Hide error message after 3 seconds
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm font-medium"
          >
            Log In
          </button>
        </form>

        {/* Error Message Popup */}
        {showErrorMessage && (
          <div className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-md shadow-md">
            <p>Invalid email or password. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

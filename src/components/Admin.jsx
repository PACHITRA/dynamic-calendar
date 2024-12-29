import { useState } from "react";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!adminId.trim()) {
      setError("Admin ID is required!");
      setSubmitted(false);
      return;
    }
    if (!password.trim()) {
      setError("Password is required!");
      setSubmitted(false);
      return;
    }

    setError("");
    setLoading(true); 
    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login!");
      }

      const data = await response.json();
      console.log("Server Response:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Failed to login. Please try again!");
    } finally {
      setLoading(false); 
    }
  };

  const handleAdminIdChange = (e) => {
    setAdminId(e.target.value);
    setSubmitted(false); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSubmitted(false); 
  };

  return (
    <div className="flex items-start justify-center w-screen h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="adminId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin ID:
              </label>
              <input
                type="text"
                id="adminId"
                value={adminId}
                onChange={handleAdminIdChange}
                placeholder="Enter your Admin ID"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-semibold">{error}</p>
            )}
            {submitted && !error && (
              <p className="text-sm text-green-600 font-semibold">
                Login successful!
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

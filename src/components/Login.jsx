import { useState, useEffect } from "react";

const Login = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [isCr, setIsCr] = useState(false); // State for CR checkbox
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [submitted, setSubmitted] = useState(false);
  const [registerUrl, setRegisterUrl] = useState(""); // State for registration URL

  useEffect(() => {
    // Fetch registration URL from backend
    const fetchRegisterUrl = async () => {
      try {
        const response = await fetch("http://localhost:3000/student/register");
        if (response.ok) {
          const data = await response
          setRegisterUrl(data.url);
        } else {
          console.error("Failed to fetch register URL");
        }
      } catch (err) {
        console.error("Network Error:", err);
      }
    };

    fetchRegisterUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!usn.trim()) {
      setError("USN is required!");
      setSubmitted(false);
      return;
    }
    if (isCr && !password.trim()) {
      setError("Password is required for CR!");
      setSubmitted(false);
      return;
    }

    setError("");
    setLoading(true); // Start loading

    try {
      // Simulating an API call
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usn,
          password: isCr ? password : null,
          isCr,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login!");
      }

      const data = await response
      console.log("Server Response:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error during login:", error);
      setError("Failed to login. Please try again!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleUsnChange = (e) => {
    setUsn(e.target.value);
    setSubmitted(false); // Reset submitted state if user starts typing again
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSubmitted(false); // Reset submitted state if user starts typing again
  };

  const handleCrChange = (e) => {
    setIsCr(e.target.checked); // Toggle CR state based on checkbox
    setSubmitted(false); // Reset submitted state when toggling
  };

  return (
    <div className="flex items-start justify-center w-screen h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="usn"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                USN (University Serial Number):
              </label>
              <input
                type="text"
                id="usn"
                value={usn}
                onChange={handleUsnChange}
                placeholder="Enter your USN"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isCr"
                checked={isCr}
                onChange={handleCrChange}
                className="w-5 h-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isCr"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Are you a Class Representative (CR)?
              </label>
            </div>

            {/* Conditional rendering for password input */}
            {isCr && (
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
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

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
                disabled={loading} // Disable button during loading
                className={`w-full py-3 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white font-bold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          {/* Register Button */}
          <div className="mt-6 text-center">
  <p className="text-sm text-gray-700">
    Not registered?{" "}
    <a
      href={registerUrl || "#"} // Use '#' as fallback if registerUrl is not available
      className="text-purple-600 hover:text-purple-700 font-medium"
    >
      Please register
    </a>
  </p>
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;

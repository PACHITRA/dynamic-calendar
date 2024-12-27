import { useState } from "react";

const Login = () => {
  const [usn, setUsn] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usn.trim()) {
      setError("Username is required!");
      setSubmitted(false);
    } else {
      setError("");
      console.log("Submitted USN:", usn);
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setUsn(e.target.value);
    setSubmitted(false); // Reset submitted state if user starts typing again
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={usn}
                onChange={handleChange}
                placeholder="Enter your username"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";

const Login = () => {
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [isCr, setIsCr] = useState(false); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [submitted, setSubmitted] = useState(false);
  const [registerUrl, setRegisterUrl] = useState(""); 
  const [adminUrl, setAdminUrl] = useState(""); 

  useEffect(() => {
    
    const fetchUrls = async () => {
      try {
      
        const registerResponse = await fetch("http://localhost:3000/student/register");
        if (registerResponse.ok) {
          const registerData = await registerResponse.json();
          setRegisterUrl(registerData.url);
        } else {
          console.error("Failed to fetch register URL");
        }

        
        const adminResponse = await fetch("http://localhost:3000/admin/login");
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          setAdminUrl(adminData.url);
        } else {
          console.error("Failed to fetch admin login URL");
        }
      } catch (err) {
        console.error("Network Error:", err);
      }
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
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
    setLoading(true); 

    try {
      
      const response = await fetch("http://localhost:3000/student/login", {
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

  const handleUsnChange = (e) => {
    setUsn(e.target.value);
    setSubmitted(false); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setSubmitted(false); 
  };

  const handleCrChange = (e) => {
    setIsCr(e.target.checked); 
    setSubmitted(false); 
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
                disabled={loading} 
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
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Not registered?{" "}
              <a
                href={registerUrl || "#"} 
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Please register
              </a>
            </p>
            <p className="text-sm text-gray-700 mt-4">
              Admin?{" "}
              <a
                href={adminUrl || "/admin/login"} 
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Admin Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

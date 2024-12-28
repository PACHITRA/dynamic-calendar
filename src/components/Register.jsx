import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Loader } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [section, setSection] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginUrl, setLoginUrl] = useState("");

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await fetch("http://localhost:3000/student/login");
        if (response.ok) {
          const data = await response.json();
          setLoginUrl(data.url);
        } else {
          console.error("Failed to fetch login URL");
        }
      } catch (err) {
        console.error("Network Error:", err);
      }
    };

    fetchLoginUrl();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !usn.trim() || !section.trim() || !branch.trim() || !semester.trim()) {
      setError("All fields are required!");
      setSubmitted(false);
    } else {
      setError("");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/student/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, usn, section, branch, semester }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Registration Successful:", result);
          setSubmitted(true);
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          setError(errorData.message || "Registration failed. Please try again.");
          setSubmitted(false);
        }
      } catch (err) {
        console.error("Network Error:", err);
        setError("Network error occurred. Please try again later.");
        setSubmitted(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
    setSubmitted(false);
  };

  const branches = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"];
  const sections = ["A", "B", "C", "D"];
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student Registration</h1>
            <p className="mt-2 text-sm text-gray-600">Please fill in your details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleChange(e, setName)}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="usn" className="block text-sm font-medium text-gray-700">USN</label>
              <input
                type="text"
                id="usn"
                value={usn}
                onChange={(e) => handleChange(e, setUsn)}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="NNMXXYY123"
              />
            </div>

            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <select
                id="branch"
                value={branch}
                onChange={(e) => handleChange(e, setBranch)}
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b} className="text-black">{b}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
                <select
                  id="section"
                  value={section}
                  onChange={(e) => handleChange(e, setSection)}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-black"
                >
                  <option value="">Select</option>
                  {sections.map((s) => (
                    <option key={s} value={s} className="text-black">{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => handleChange(e, setSemester)}
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-black"
                >
                  <option value="">Select</option>
                  {semesters.map((s) => (
                    <option key={s} value={s} className="text-black">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle size={16} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {submitted && !error && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle2 size={16} />
                <p className="text-sm font-medium">Registration successful!</p>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <Loader className="animate-spin" size={16} />
                  <span>Loading...</span>
                </div>
              ) : (
                "Register Now"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Already registered?{" "}
              <a
                href={loginUrl || "#"}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Please login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

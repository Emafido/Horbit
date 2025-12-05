// pages/SignInSimple.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInSimple: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"patient" | "doctor">("patient");
  const navigate = useNavigate();

  // Check if user data exists in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("clinicflow_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
      setUserType(userData.userType || "patient");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create user data object
    const userData = {
      firstName,
      lastName,
      email,
      userType,
      loginTime: new Date().toISOString(),
    };

    // Store in localStorage
    localStorage.setItem("clinicflow_user", JSON.stringify(userData));
    localStorage.setItem("clinicflow_user_type", userType);
    localStorage.setItem("clinicflow_user_email", email);
    localStorage.setItem("clinicflow_user_firstName", firstName);
    localStorage.setItem("clinicflow_user_lastName", lastName);
    localStorage.setItem(
      "clinicflow_user_fullName",
      `${firstName} ${lastName}`
    );

    // If doctor, also add to doctors array for the patient list
    if (userType === "doctor") {
      const doctors = JSON.parse(
        localStorage.getItem("clinicflow_doctors") || "[]"
      );

      const newDoctor = {
        email,
        name: `${firstName} ${lastName}`,
        specialization: "General Practitioner",
        id: `doc_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      doctors.push(newDoctor);
      localStorage.setItem("clinicflow_doctors", JSON.stringify(doctors));
      localStorage.setItem(
        "clinicflow_current_doctor",
        JSON.stringify(newDoctor)
      );
    }

    // Navigate based on user type
    if (userType === "patient") {
      navigate("/patientshome");
    } else {
      navigate("/doctorshome");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1
              className="text-4xl font-bold text-gray-900"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Clinic<span className="text-blue-600">Flow</span>
            </h1>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2
            className="text-2xl font-bold text-gray-900 mb-6 text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Sign In to ClinicFlow
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">I am a:</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUserType("patient")}
                  className={`flex-1 py-3 rounded-lg border transition duration-300 font-medium ${
                    userType === "patient"
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("doctor")}
                  className={`flex-1 py-3 rounded-lg border transition duration-300 font-medium ${
                    userType === "doctor"
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Doctor
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                  required
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                  required
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
                required
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 mt-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Sign In as {userType === "doctor" ? "Doctor" : "Patient"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p
              className="text-gray-600"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sign up
              </Link>
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-gray-500 hover:text-gray-700"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSimple;

// pages/SignInSimple.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      alert('Please select your role (Patient or Doctor)');
      return;
    }
    
    // Handle login logic here
    console.log({ email, password, rememberMe, userType });
    
    // Navigate based on user type
    if (userType === 'patient') {
      navigate('/patientshome');
    } else {
      navigate('/doctorshome');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <h1 className="text-4xl font-bold text-gray-900">
              Clinic<span className="text-blue-600">Flow</span>
            </h1>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Headings */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Log in to ClinicFlow</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Select your role:</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('patient')}
                className={`py-3 rounded-lg border transition duration-300 font-medium ${
                  userType === 'patient'
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                I am a patient
              </button>
              <button
                type="button"
                onClick={() => setUserType('doctor')}
                className={`py-3 rounded-lg border transition duration-300 font-medium ${
                  userType === 'doctor'
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                I am a doctor
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!userType}
            >
              {userType === 'doctor' ? 'Log in as Doctor' : 'Log in as Patient'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-900 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
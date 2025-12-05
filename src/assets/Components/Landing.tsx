// components/Hero.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Calendar,
  Shield,
  Smartphone,
  Users,
  FileText,
  Lock,
  CheckCircle,
} from "lucide-react";

const Landing: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Queue",
      description:
        "Live waiting times updated every minute. No more waiting in uncertainty.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Instant Booking",
      description:
        "Book appointments in seconds. See doctor availability instantly.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Records",
      description:
        "Your medical history stored securely and accessible anytime.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Works seamlessly on any smartphone, tablet, or computer.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign In",
      description: "Access your account instantly with secure login",
    },
    {
      step: "2",
      title: "Find Doctor",
      description: "Browse available doctors by specialty or location",
    },
    {
      step: "3",
      title: "Book Slot",
      description: "Select your preferred time and confirm booking",
    },
    {
      step: "4",
      title: "Track Queue",
      description: "Monitor your queue position in real-time",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-inter">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="Modern clinic environment"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/10"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navigation/Header */}
        <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  CF
                </span>
              </div>
              <h1 className="text-white font-bold text-xl sm:text-2xl font-spaceGrotesk">
                Clinic<span className="text-blue-400">Flow</span>
              </h1>
            </div>

            <Link to="/signin">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-lg text-sm transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              {/* Left Column - Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6 lg:mb-8">
                  {/* Tagline */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      Revolutionizing Healthcare Access
                    </span>
                  </div>

                  {/* Main Heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 font-spaceGrotesk leading-tight">
                    Healthcare
                    <br />
                    <span className="text-blue-400">Without</span> the{" "}
                    <span className="relative">
                      Wait
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                    </span>
                  </h1>

                  {/* Subheading */}
                  <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-6 lg:mb-8 max-w-xl lg:max-w-2xl mx-auto lg:mx-0 font-poppins font-light">
                    Book, queue, and manage appointments — all from your phone,
                    <span className="text-blue-300 font-medium">
                      {" "}
                      fast & seamless.
                    </span>
                  </p>

                  {/* Description */}
                  <p className="text-lg text-white/80 mb-8 lg:mb-12 max-w-lg lg:max-w-xl mx-auto lg:mx-0">
                    Experience modern healthcare with real-time queue updates,
                    instant booking, and digital records — designed for your
                    convenience.
                  </p>

                  {/* CTA Button */}
                  <div className="flex justify-center lg:justify-start">
                    <Link to="/signin" className="group">
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30 flex items-center justify-center gap-3 group-hover:gap-4">
                        Get Started Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-md lg:max-w-xl mx-auto lg:mx-0">
                    <div className="text-center lg:text-left">
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                        10k+
                      </div>
                      <div className="text-sm text-white/70">
                        Patients Served
                      </div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-white/70">Queue Updates</div>
                    </div>
                    <div className="col-span-2 lg:col-span-1 text-center lg:text-left">
                      <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                        99%
                      </div>
                      <div className="text-sm text-white/70">
                        Satisfaction Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visual Elements */}
              <div className="flex-1 flex justify-center relative">
                {/* App Mockup Container */}
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                  {/* Main App Screenshot */}
                  <div className="relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl lg:shadow-3xl transform hover:scale-[1.02] transition duration-500 border-2 border-white/20">
                    <img
                      src="/hero.jpg"
                      alt="ClinicFlow App Interface"
                      className="w-full h-auto object-cover"
                    />
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                  </div>

                  {/* Floating Cards */}
                  <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6">
                    <div className="bg-white/95 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-xl border border-white/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm lg:text-base font-semibold text-gray-800">
                          Live Queue Status
                        </span>
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                        12 min
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 mt-1">
                        Estimated wait time
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6">
                    <div className="bg-white/95 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-xl border border-white/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            ✓
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            Appointment
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            Confirmed!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="inline-flex flex-col items-center gap-3 text-white/60">
            <span className="text-sm">Scroll to explore features</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Below the fold */}
      <div className="relative bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-spaceGrotesk">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All the essential features for modern healthcare management
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Simple Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Four easy steps to manage your healthcare
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-white text-2xl font-bold">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Section */}
          <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Security First</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Data is <span className="text-green-600">Secure</span>
              </h2>

              <p className="text-lg text-gray-600 mb-8">
                We use enterprise-grade encryption and security protocols to
                protect your sensitive health information.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Regular Security Audits</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      Military-Grade Security
                    </h3>
                    <p className="text-green-100">
                      Your privacy is our priority
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <span>Data Encryption</span>
                    <span className="font-bold">AES-256</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <span>Security Compliance</span>
                    <span className="font-bold">HIPAA Certified</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <span>Uptime</span>
                    <span className="font-bold">99.9% SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

// components/Features.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Shield,
  Smartphone,
  Zap,
  Users,
  Bell,
  FileText,
  Globe,
  Lock,
  MessageSquare,
  BarChart,
} from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Queue Updates",
      description:
        "Live waiting times and queue positions updated every minute. Never wait in uncertainty again.",
      color: "from-blue-500 to-cyan-500",
      stats: "Updates every 60s",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Instant Appointment Booking",
      description:
        "Book appointments in seconds. See doctor availability and select time slots that work for you.",
      color: "from-green-500 to-emerald-500",
      stats: "Book in <30s",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Health Records",
      description:
        "Your medical history, prescriptions, and test results stored securely and accessible anytime.",
      color: "from-purple-500 to-violet-500",
      stats: "HIPAA Compliant",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description:
        "Optimized for mobile devices. Works seamlessly on any smartphone, tablet, or computer.",
      color: "from-orange-500 to-red-500",
      stats: "100% Responsive",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Built for speed. Loads instantly and works even with slow internet connections.",
      color: "from-yellow-500 to-amber-500",
      stats: "<1s Load Time",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Management",
      description:
        "Manage appointments and health records for your entire family from one account.",
      color: "from-pink-500 to-rose-500",
      stats: "Unlimited Profiles",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Reminders",
      description:
        "Get notifications for upcoming appointments, medication times, and follow-up visits.",
      color: "from-indigo-500 to-blue-500",
      stats: "Custom Alerts",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Digital Prescriptions",
      description:
        "Get prescriptions digitally. Share them with pharmacies instantly without paper hassles.",
      color: "from-teal-500 to-green-500",
      stats: "Paperless",
    },
  ];

  const keyBenefits = [
    {
      title: "Save Time",
      description:
        "Reduce waiting time by up to 70% with smart queue management",
      value: "70%",
    },
    {
      title: "Easy Access",
      description:
        "Access your health records anytime, anywhere from any device",
      value: "24/7",
    },
    {
      title: "Cost Effective",
      description:
        "No more missed appointments with smart reminders and easy rescheduling",
      value: "Save $",
    },
    {
      title: "Peace of Mind",
      description:
        "Your data is encrypted and secure with enterprise-grade security",
      value: "100% Secure",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description:
        "Create your account in less than a minute with just your email",
      icon: <Users className="w-8 h-8" />,
    },
    {
      step: "2",
      title: "Find a Doctor",
      description:
        "Browse available doctors by specialty, location, or availability",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      step: "3",
      title: "Book Appointment",
      description: "Select your preferred time slot and confirm your booking",
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      step: "4",
      title: "Manage Health",
      description: "Track your appointments, prescriptions, and health records",
      icon: <FileText className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 font-inter">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Why Choose ClinicFlow</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-spaceGrotesk">
              Healthcare Made
              <span className="text-blue-600"> Simple</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Everything you need for a seamless healthcare experience, designed
              to save you time and reduce stress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30">
                  Start Free Trial
                </button>
              </Link>
              <Link to="/pricing">
                <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-xl text-lg border border-gray-300 transition-all duration-300 hover:scale-105">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {benefit.value}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed with patients and doctors in mind for the best healthcare
            experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 mb-4">{feature.description}</p>

              <div className="text-sm font-medium text-blue-600">
                {feature.stats}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four simple steps to better healthcare management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200"></div>

            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                    <span className="text-white text-2xl font-bold">
                      {step.step}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div className="inline-flex p-3 rounded-xl bg-blue-100 text-blue-600 mb-4">
                      {step.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Security First</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Data is <span className="text-green-600">100% Secure</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              We use enterprise-grade encryption and security protocols to
              protect your sensitive health information.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">End-to-End Encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">HIPAA & GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart className="w-4 h-4 text-green-600" />
                </div>
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
                  <p className="text-green-100">Your privacy is our priority</p>
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

            {/* Floating element */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-gray-600">
                Data Privacy Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who have already simplified their
            healthcare journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Get Started Free
              </button>
            </Link>

            <Link to="/demo">
              <button className="bg-transparent hover:bg-white/10 text-white font-medium py-4 px-8 rounded-xl text-lg border-2 border-white transition-all duration-300 hover:scale-105">
                Book a Demo
              </button>
            </Link>
          </div>

          <p className="text-blue-200 text-sm mt-8">
            No credit card required • Free 30-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

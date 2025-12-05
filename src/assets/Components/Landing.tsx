// components/Hero.tsx
import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12 font-inter">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-2 font-space-grotesk">
                Clinic<span className="text-blue-600">Flow</span>
              </h1>
              <div className="h-1 w-24 bg-blue-500 rounded-full"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-6 leading-tight font-poppins">
              Your Health, Your Way.
              <br />
              <span className="text-blue-600">No Waiting!</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 mb-6 lg:mb-8 max-w-xl font-inter">
              Book, queue, update — all from your phone, fast & easy.
            </p>

            <div className="hidden lg:inline-flex items-center gap-3 bg-linear-to-r from-blue-100 to-indigo-100 px-6 py-4 rounded-full mb-8 font-inter">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700 font-medium">
                Built for speed & good vibes — even offline!
              </span>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl transform hover:scale-[1.02] transition duration-500">
                <img
                  src="/hero.jpg"
                  alt="ClinicFlow App Interface"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-500/10 to-transparent"></div>
              </div>

              <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg font-inter">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"></div>
                  <span className="text-xs lg:text-sm font-medium">
                    Live Queue
                  </span>
                </div>
                <div className="text-lg lg:text-2xl font-bold mt-1">12 min</div>
              </div>

              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg font-inter">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm lg:text-base">
                      ✓
                    </span>
                  </div>
                  <span className="text-xs lg:text-sm font-medium">
                    Booked!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-0 lg:absolute lg:top-auto lg:left-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-2xl">
            <Link to={`/signin`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto font-poppins">
                Book Now!
              </button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <div className="mt-8 lg:hidden inline-flex items-center gap-3 bg-linear-to-r from-blue-100 to-indigo-100 px-5 py-3 rounded-full mx-auto font-inter">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm sm:text-base text-gray-700 font-medium">
              Built for speed & good vibes — even offline!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

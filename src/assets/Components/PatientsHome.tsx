// components/PatientHomeMinimal.tsx
import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Users } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  distance: string;
  status: 'waiting' | 'open';
  waitTime?: number;
  imageColor: string;
}

const PatientsHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Pediatrician",
      rating: 4.8,
      location: "Children's Medical Center",
      distance: "1.2 mi",
      status: "waiting",
      waitTime: 3,
      imageColor: "bg-blue-50"
    },
    {
      id: 2,
      name: "Dr. David Lee",
      specialty: "Dermatologist",
      rating: 4.6,
      location: "Skin Care Clinic",
      distance: "2.5 mi",
      status: "open",
      imageColor: "bg-green-50"
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      specialty: "Cardiologist",
      rating: 4.9,
      location: "Heart Health Center",
      distance: "3.1 mi",
      status: "waiting",
      waitTime: 5,
      imageColor: "bg-purple-50"
    },
    {
      id: 4,
      name: "Dr. James Kim",
      specialty: "General Practitioner",
      rating: 4.5,
      location: "Family Health Clinic",
      distance: "0.8 mi",
      status: "open",
      imageColor: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">CF</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Welcome back,</p>
              <h1 className="text-2xl font-bold text-gray-900">Alex</h1>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Who would you like to see today?
            </h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctor, specialty or clinic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
              Pediatrician
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
              Dermatologist
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">
              <Filter className="w-4 h-4 inline mr-1" />
              Filter
            </button>
          </div>
        </div>

        {/* Doctors List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Available Doctors
          </h3>
          
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`${doctor.imageColor} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <span className="text-lg font-bold text-gray-700">
                      {doctor.name.split(' ')[1].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{doctor.name}</h4>
                    <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                  </div>
                </div>
                
                {doctor.status === 'waiting' ? (
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-700 font-medium text-sm">
                      {doctor.waitTime} waiting
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-emerald-700 font-medium text-sm">Open</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.distance}</span>
                  </div>
                </div>
                <button className="text-blue-600 font-medium hover:text-blue-700">
                  Book →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">Showing</p>
              <p className="font-semibold text-gray-900">{doctors.length} doctors</p>
            </div>
            <div>
              <p className="text-gray-600">Nearest</p>
              <p className="font-semibold text-gray-900">0.8 mi</p>
            </div>
            <div>
              <p className="text-gray-600">Average wait</p>
              <p className="font-semibold text-gray-900">4 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsHome;
// pages/DoctorDashboard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorHome: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const appointments = [
    { queueNo: 101, patientName: 'John Davis', reason: 'Check-up', time: '10:00 AM', status: 'In Session' },
    { queueNo: 102, patientName: 'Maria Garcia', reason: 'Follow-up', time: '10:15 AM', status: 'In Session' },
    { queueNo: 103, patientName: 'Robert Lee', reason: 'Consultation', time: '10:30 AM', status: 'In Session' },
    { queueNo: 104, patientName: 'Jovin Gorson', reason: 'Check-up', time: '12:00 PM', status: 'In Session' },
    { queueNo: 105, patientName: 'Renyinna Smith', reason: 'Follow-up', time: '11:00 AM', status: 'In Session' },
    { queueNo: 106, patientName: 'Green Caterien', reason: 'Check-up', time: '06:00 PM', status: 'In Session' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first Responsive Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 mr-2"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Clinic<span className="text-blue-600">Flow</span>
                </h1>
              </Link>
              
              {/* Doctor Info (Desktop) */}
              <div className="hidden md:flex items-center ml-6 pl-6 border-l border-gray-300">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-semibold text-sm">SC</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Welcome back</p>
                  <p className="font-semibold text-gray-900 text-sm">Dr. Sarah Chen</p>
                </div>
              </div>
            </div>

            {/* Right: Navigation and Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Notifications (Icon only on mobile) */}
              <button 
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 relative"
                aria-label="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </button>
              
              {/* Settings */}
              <button 
                className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                aria-label="Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="sr-only">Settings</span>
              </button>
              
              {/* Doctor Info (Mobile) */}
              <div className="md:hidden ml-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">SC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-3">
                <div className="px-4">
                  <p className="text-sm font-medium text-gray-900">Dr. Sarah Chen</p>
                  <p className="text-xs text-gray-500">General Practitioner</p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <Link 
                    to="/doctor/patients" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-10A8.5 8.5 0 0112 20.5 8.5 8.5 0 113.5 12a8.5 8.5 0 0117 0z" />
                    </svg>
                    Patients
                  </Link>
                  <Link 
                    to="/doctor/schedule" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule
                  </Link>
                  <Link 
                    to="/doctor/reports" 
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Reports
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Today's overview and patient queue</p>
        </div>

        {/* Overview Cards - Responsive Grid */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Today's Overview</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Patients Today Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Patients today</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">28</p>
                  <div className="flex items-center mt-2 sm:mt-3">
                    <div className="flex items-center text-green-500">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm font-medium">5 more than yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 sm:p-3 bg-blue-50 rounded-lg ml-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-10A8.5 8.5 0 0112 20.5 8.5 8.5 0 113.5 12a8.5 8.5 0 0117 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Current Waiting Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Current waiting</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">7</p>
                  <div className="mt-2 sm:mt-3">
                    <p className="text-sm font-medium text-gray-700">
                      Wait time: <span className="text-blue-600">15m</span>
                    </p>
                  </div>
                </div>
                <div className="p-2 sm:p-3 bg-orange-50 rounded-lg ml-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Average Wait Time Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Avg wait time</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1 sm:mt-2">12 min</p>
                  <div className="flex items-center mt-2 sm:mt-3">
                    <div className="flex items-center text-green-500">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs sm:text-sm font-medium">On track</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 sm:p-3 bg-green-50 rounded-lg ml-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Appointment Queue */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 md:mb-8">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Today's Appointment Queue</h2>
              <div className="mt-2 sm:mt-0">
                <span className="text-sm text-gray-600">Total: <span className="font-bold">28</span> patients</span>
              </div>
            </div>
          </div>
          
          {/* Responsive Table Container */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Queue No.
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Patient Name
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Reason
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Time
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.queueNo} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">#{appointment.queueNo}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.reason}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.time}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="flex items-center mb-1 sm:mb-0">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                            <span className="text-xs sm:text-sm font-medium text-green-700">{appointment.status}</span>
                          </div>
                          <div className="flex space-x-1 sm:space-x-2 ml-0 sm:ml-4">
                            <button className="p-1 text-blue-600 hover:text-blue-800" aria-label="View details">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-1 text-blue-600 hover:text-blue-800" aria-label="Complete">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <button className="p-1 text-blue-600 hover:text-blue-800" aria-label="Edit">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Footer - Responsive */}
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">6</span> of <span className="font-medium">28</span> appointments
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex-1 sm:flex-none">
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">←</span>
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 flex-1 sm:flex-none">
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Responsive Grid */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <button className="flex flex-col sm:flex-row items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="font-medium text-sm sm:text-base text-center sm:text-left">New Patient</span>
            </button>
            
            <button className="flex flex-col sm:flex-row items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-sm sm:text-base text-center sm:text-left">Schedule</span>
            </button>
            
            <button className="flex flex-col sm:flex-row items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-sm sm:text-base text-center sm:text-left">Complete Visit</span>
            </button>
            
            <button className="flex flex-col sm:flex-row items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-blue-600 mb-2 sm:mb-0 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium text-sm sm:text-base text-center sm:text-left">Generate Report</span>
            </button>
          </div>
        </div>

        {/* Stats Summary - Mobile Only */}
        <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Daily Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">28</p>
              <p className="text-xs text-gray-600">Total Patients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">12m</p>
              <p className="text-xs text-gray-600">Avg Wait Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">7</p>
              <p className="text-xs text-gray-600">Waiting Now</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">21</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-40">
        <Link to="/doctor/dashboard" className="flex flex-col items-center text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link to="/doctor/patients" className="flex flex-col items-center text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-10A8.5 8.5 0 0112 20.5 8.5 8.5 0 113.5 12a8.5 8.5 0 0117 0z" />
          </svg>
          <span className="text-xs mt-1">Patients</span>
        </Link>
        <Link to="/doctor/schedule" className="flex flex-col items-center text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Schedule</span>
        </Link>
        <Link to="/doctor/profile" className="flex flex-col items-center text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>

      {/* Add padding to main content for mobile bottom nav */}
      <div className="pb-16 md:pb-0"></div>
    </div>
  );
};

export default DoctorHome;
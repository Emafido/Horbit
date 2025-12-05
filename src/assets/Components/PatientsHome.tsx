// components/PatientHomeMinimal.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Users,
  LogOut,
  Bell,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  distance: string;
  status: "waiting" | "open";
  waitTime?: number;
  imageColor: string;
  email?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userType: "patient" | "doctor";
  loginTime: string;
}

const PatientsHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );
  const [showFilter, setShowFilter] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [hasActiveAppointment, setHasActiveAppointment] =
    useState<boolean>(false);
  const [activeAppointment, setActiveAppointment] = useState<any>(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("clinicflow_user");
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Check for active appointments
    checkActiveAppointment();
  }, []);

  // Check for active appointments
  const checkActiveAppointment = () => {
    try {
      const patientEmail = localStorage.getItem("clinicflow_user_email");
      const appointments = JSON.parse(
        localStorage.getItem("clinicflow_appointments") || "[]"
      );
      const today = new Date().toDateString();

      const activeAppt = appointments.find((apt: any) => {
        if (!apt.patientEmail || !apt.bookedTime) return false;
        const aptDate = new Date(apt.bookedTime).toDateString();
        return (
          apt.patientEmail === patientEmail &&
          aptDate === today &&
          apt.status !== "completed"
        );
      });

      if (activeAppt) {
        setHasActiveAppointment(true);
        setActiveAppointment(activeAppt);

        // Store appointment for live queue
        localStorage.setItem(
          "currentPatientAppointment",
          JSON.stringify(activeAppt)
        );
      }
    } catch (error) {
      console.error("Error checking active appointment:", error);
    }
  };

  // Doctors data
  const staticDoctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Pediatrician",
      rating: 4.8,
      location: "Children's Medical Center",
      distance: "1.2 mi",
      status: "waiting",
      waitTime: 3,
      imageColor: "bg-blue-50",
      email: "emily.chen@clinic.com",
    },
    {
      id: 2,
      name: "Dr. David Lee",
      specialty: "Dermatologist",
      rating: 4.6,
      location: "Skin Care Clinic",
      distance: "2.5 mi",
      status: "open",
      imageColor: "bg-green-50",
      email: "david.lee@clinic.com",
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
      imageColor: "bg-purple-50",
      email: "maria.rodriguez@clinic.com",
    },
    {
      id: 4,
      name: "Dr. James Kim",
      specialty: "General Practitioner",
      rating: 4.5,
      location: "Family Health Clinic",
      distance: "0.8 mi",
      status: "open",
      imageColor: "bg-orange-50",
      email: "james.kim@clinic.com",
    },
  ];

  // Get doctors from localStorage
  const getLocalStorageDoctors = (): Doctor[] => {
    const storedDoctors = localStorage.getItem("clinicflow_doctors");
    if (!storedDoctors) return [];

    try {
      const parsedDoctors = JSON.parse(storedDoctors);
      return parsedDoctors.map((doctor: any, index: number) => ({
        id: 1000 + index,
        name: doctor.name || `Dr. ${doctor.email?.split("@")[0] || "Doctor"}`,
        specialty: doctor.specialization || "General Practitioner",
        rating: parseFloat((4.5 + Math.random() * 0.4).toFixed(1)),
        location: "ClinicFlow Partner Clinic",
        distance: (1 + Math.random() * 3).toFixed(1) + " mi",
        status: Math.random() > 0.5 ? "waiting" : "open",
        waitTime:
          Math.random() > 0.5 ? Math.floor(Math.random() * 6) : undefined,
        imageColor: [
          "bg-blue-50",
          "bg-green-50",
          "bg-purple-50",
          "bg-orange-50",
        ][index % 4],
        email: doctor.email,
      }));
    } catch (error) {
      console.error("Error parsing doctors from localStorage:", error);
      return [];
    }
  };

  // Combine static and localStorage doctors
  const doctors = [...staticDoctors, ...getLocalStorageDoctors()];

  // Get unique specialties
  const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];

  // Filter doctors based on search and specialty
  useEffect(() => {
    let result = doctors;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query) ||
          doctor.location.toLowerCase().includes(query)
      );
    }

    if (selectedSpecialty) {
      result = result.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    setFilteredDoctors(result);
  }, [searchQuery, selectedSpecialty]);

  // Get user's full name
  const getUserFullName = () => {
    const fullName = localStorage.getItem("clinicflow_user_fullName");
    if (fullName) return fullName;

    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    }

    const firstName = localStorage.getItem("clinicflow_user_firstName");
    const lastName = localStorage.getItem("clinicflow_user_lastName");
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    const email = localStorage.getItem("clinicflow_user_email");
    if (email) {
      const namePart = email.split("@")[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }

    return "Patient";
  };

  // Get user's initials
  const getUserInitials = () => {
    const fullName = getUserFullName();
    const nameParts = fullName.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("clinicflow_user");
        localStorage.removeItem("clinicflow_user_type");
        localStorage.removeItem("clinicflow_user_email");
        localStorage.removeItem("clinicflow_user_firstName");
        localStorage.removeItem("clinicflow_user_lastName");
        localStorage.removeItem("clinicflow_user_fullName");
        localStorage.removeItem("currentPatientAppointment");
        navigate("/");
      }
    });
  };

  // Handle book appointment
  const handleBookAppointment = (doctor: Doctor) => {
    Swal.fire({
      title: "Confirm Appointment",
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Doctor:</strong> ${doctor.name}</p>
          <p class="mb-2"><strong>Specialty:</strong> ${doctor.specialty}</p>
          <p class="mb-2"><strong>Location:</strong> ${doctor.location}</p>
          <p><strong>Distance:</strong> ${doctor.distance}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Book Appointment",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const appointment = {
          id: `appt_${Date.now()}`,
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorEmail: doctor.email,
          specialty: doctor.specialty,
          patientName: getUserFullName(),
          patientEmail:
            userData?.email || localStorage.getItem("clinicflow_user_email"),
          bookedTime: new Date().toISOString(),
          status: "pending",
          location: doctor.location,
          estimatedWait: doctor.waitTime || 0,
        };

        // Save to appointments
        const appointments = JSON.parse(
          localStorage.getItem("clinicflow_appointments") || "[]"
        );
        appointments.push(appointment);
        localStorage.setItem(
          "clinicflow_appointments",
          JSON.stringify(appointments)
        );

        // Also add to doctor's queue (for live queue simulation)
        const doctorAppointments = JSON.parse(
          localStorage.getItem("clinicflow_doctor_appointments") || "[]"
        );
        doctorAppointments.push({
          ...appointment,
          status: "waiting",
          queuePosition: doctorAppointments.length + 1,
        });
        localStorage.setItem(
          "clinicflow_doctor_appointments",
          JSON.stringify(doctorAppointments)
        );

        // Store current appointment for live queue
        localStorage.setItem(
          "currentPatientAppointment",
          JSON.stringify(appointment)
        );

        Swal.fire({
          title: "Appointment Booked!",
          html: `
            <div class="text-left">
              <p class="mb-2">Your appointment with <strong>${doctor.name}</strong> has been scheduled.</p>
              <p class="mb-2">You will receive updates about your queue status.</p>
              <p>Click "View Live Queue" to track your position.</p>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "View Live Queue",
          showCancelButton: true,
          cancelButtonText: "Continue Browsing",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/livequeue");
          } else {
            setHasActiveAppointment(true);
            setActiveAppointment(appointment);
          }
        });
      }
    });
  };

  // View Live Queue
  const handleViewLiveQueue = () => {
    if (!activeAppointment) {
      Swal.fire({
        title: "No Active Appointment",
        text: "You don't have an active appointment to track.",
        icon: "info",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    navigate("/livequeue");
  };

  // Calculate statistics
  const calculateStats = () => {
    if (filteredDoctors.length === 0) {
      return {
        nearestDistance: "N/A",
        averageWaitTime: "0",
        availableDoctors: 0,
      };
    }

    const distances = filteredDoctors.map((d) =>
      parseFloat(d.distance.split(" ")[0])
    );
    const nearestDistance = Math.min(...distances).toFixed(1);

    const doctorsWithWait = filteredDoctors.filter(
      (d) => d.status === "waiting"
    );
    const averageWaitTime =
      doctorsWithWait.length > 0
        ? (
            doctorsWithWait.reduce((sum, d) => sum + (d.waitTime || 0), 0) /
            doctorsWithWait.length
          ).toFixed(0)
        : "0";

    return {
      nearestDistance,
      averageWaitTime,
      availableDoctors: filteredDoctors.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Active Appointment Banner */}
        {hasActiveAppointment && activeAppointment && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p
                    className="font-medium text-blue-800"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Appointment Confirmed
                  </p>
                  <p
                    className="text-sm text-blue-600"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {activeAppointment.doctorName} • Today
                  </p>
                </div>
              </div>
              <button
                onClick={handleViewLiveQueue}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Clock className="w-4 h-4" />
                Live Queue
              </button>
            </div>
          </div>
        )}

        {/* User Info Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-lg font-bold text-blue-600">
                  {getUserInitials()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs sm:text-sm text-gray-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Welcome back,
                </p>
                <h1
                  className="text-xl sm:text-2xl font-bold text-gray-900 truncate"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {getUserFullName()}
                </h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto justify-center sm:justify-start"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              Logout
            </button>
          </div>

          {/* User Info Card */}
          <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="col-span-2 sm:col-span-1">
                <p
                  className="text-gray-500 truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Full Name
                </p>
                <p
                  className="font-medium text-gray-900 truncate"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {getUserFullName()}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p
                  className="text-gray-500 truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Email
                </p>
                <p
                  className="font-medium text-gray-900 truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {userData?.email ||
                    localStorage.getItem("clinicflow_user_email") ||
                    "Not available"}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p
                  className="text-gray-500 truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Appointments
                </p>
                <p
                  className="font-medium text-gray-900 truncate"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {
                    JSON.parse(
                      localStorage.getItem("clinicflow_appointments") || "[]"
                    ).length
                  }{" "}
                  total
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p
                  className="text-gray-500 truncate"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Status
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <p
                    className="font-medium text-gray-900 truncate"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <h2
              className="text-lg sm:text-xl font-semibold text-gray-800 mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Who would you like to see today?
            </h2>
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search doctor, specialty or clinic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700 text-sm sm:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Specialty Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-sm font-medium text-gray-700"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Filter by Specialty
              </h3>
              {specialties.length > 3 && (
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                  {showFilter ? "Hide" : "More"}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedSpecialty === null
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                All
              </button>

              {!showFilter
                ? specialties.slice(0, 3).map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        selectedSpecialty === specialty
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {specialty}
                    </button>
                  ))
                : specialties.map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        selectedSpecialty === specialty
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {specialty}
                    </button>
                  ))}
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-base sm:text-lg font-semibold text-gray-700"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Available Doctors
            </h3>
            <span
              className="text-xs sm:text-sm text-gray-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {filteredDoctors.length} found
            </span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p
                className="text-gray-500 text-sm sm:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                No doctors found matching your criteria
              </p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${doctor.imageColor} w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <span className="text-base sm:text-lg font-bold text-gray-700">
                        {doctor.name.split(" ").length > 1
                          ? doctor.name.split(" ")[1].charAt(0)
                          : doctor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="font-bold text-gray-900 truncate"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {doctor.name}
                      </h4>
                      <p
                        className="text-gray-600 text-xs sm:text-sm truncate"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {doctor.status === "waiting" ? (
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg self-start sm:self-center">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                      <span
                        className="text-amber-700 font-medium text-xs sm:text-sm whitespace-nowrap"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {doctor.waitTime} waiting
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg self-start sm:self-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span
                        className="text-emerald-700 font-medium text-xs sm:text-sm whitespace-nowrap"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Open
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>
                        {doctor.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>
                        {doctor.distance}
                      </span>
                    </div>
                    <span
                      className="text-gray-500 truncate hidden sm:inline"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {doctor.location}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="text-blue-600 font-medium hover:text-blue-700 text-sm sm:text-base mt-2 sm:mt-0 self-start sm:self-center"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Book →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Stats */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div>
              <p
                className="text-gray-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Showing
              </p>
              <p
                className="font-semibold text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {stats.availableDoctors} doctors
              </p>
            </div>
            <div>
              <p
                className="text-gray-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Nearest
              </p>
              <p
                className="font-semibold text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {stats.nearestDistance} mi
              </p>
            </div>
            <div>
              <p
                className="text-gray-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Average wait
              </p>
              <p
                className="font-semibold text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {stats.averageWaitTime} min
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/livequeue"
            className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-center font-medium transition-colors ${
              hasActiveAppointment
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
            }`}
            onClick={(e) => !hasActiveAppointment && e.preventDefault()}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            View Live Queue
          </Link>
          <button
            onClick={() => {
              Swal.fire({
                title: "Help & Support",
                text: "Contact our support team for assistance.",
                icon: "info",
                confirmButtonColor: "#3085d6",
              });
            }}
            className="flex-1 min-w-[140px] px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Get Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsHome;

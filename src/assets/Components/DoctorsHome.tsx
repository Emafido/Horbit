// pages/DoctorDashboardCompact.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Clock,
  Calendar,
  Bell,
  FileText,
  BarChart,
  Settings,
  LogOut,
  ChevronRight,
  Play,
  CheckCircle,
  Eye,
  MessageSquare,
  SkipForward,
  Plus,
  AlertCircle,
  UserCheck,
  Activity,
  Menu,
  X,
  Home,
} from "lucide-react";
import Swal from "sweetalert2";

interface Appointment {
  id: string;
  queueNo: number;
  patientName: string;
  patientEmail?: string;
  reason: string;
  time: string;
  status: "waiting" | "in-session" | "completed" | "no-show";
  priority: "routine" | "moderate" | "urgent" | "emergency";
  waitTime?: number;
  notes?: string;
  medicalHistory?: string[];
}

interface DoctorStats {
  patientsToday: number;
  patientsYesterday: number;
  currentlyWaiting: number;
  averageWaitTime: number;
  completedToday: number;
  satisfactionScore: number;
}

const DoctorHome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [stats, setStats] = useState<DoctorStats>({
    patientsToday: 0,
    patientsYesterday: 0,
    currentlyWaiting: 0,
    averageWaitTime: 0,
    completedToday: 0,
    satisfactionScore: 0,
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load doctor data and appointments from localStorage
  useEffect(() => {
    loadDoctorData();
    loadAppointments();
    loadNotifications();

    // Check screen size for sidebar
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Update stats when appointments change
  useEffect(() => {
    updateStats();
  }, [appointments]);

  const loadDoctorData = () => {
    const storedUser = localStorage.getItem("clinicflow_user");
    const storedDoctors = localStorage.getItem("clinicflow_doctors");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.userType === "doctor") {
          setDoctorName(`${userData.firstName} ${userData.lastName}`);
          setDoctorEmail(userData.email);
        }
      } catch (error) {
        console.error("Error loading doctor data:", error);
      }
    }

    if (storedDoctors) {
      try {
        const doctors = JSON.parse(storedDoctors);
        const currentDoctorEmail = localStorage.getItem(
          "clinicflow_user_email"
        );
        const currentDoctor = doctors.find(
          (d: any) => d.email === currentDoctorEmail
        );

        if (currentDoctor) {
          setDoctorSpecialty(
            currentDoctor.specialization || "General Practitioner"
          );
        }
      } catch (error) {
        console.error("Error loading doctor specialty:", error);
      }
    }
  };

  const loadAppointments = () => {
    const storedAppointments = localStorage.getItem("clinicflow_appointments");
    if (storedAppointments) {
      try {
        const allAppointments = JSON.parse(storedAppointments);

        // Filter for today's appointments for this doctor
        const doctorEmail = localStorage.getItem("clinicflow_user_email");
        const today = new Date().toDateString();

        const doctorAppointments = allAppointments
          .filter((apt: any) => {
            const aptDate = new Date(apt.bookedTime).toDateString();
            return (
              aptDate === today &&
              (apt.doctorName?.includes(doctorName) ||
                apt.doctorEmail === doctorEmail)
            );
          })
          .map((apt: any, index: number) => ({
            id: apt.id || `appt_${Date.now()}_${index}`,
            queueNo: 100 + index + 1,
            patientName: apt.patientName || "Unknown Patient",
            patientEmail: apt.patientEmail,
            reason: apt.specialty || "Consultation",
            time: formatAppointmentTime(index),
            status: getRandomStatus(),
            priority: getRandomPriority(),
            waitTime: Math.floor(Math.random() * 30),
            notes: "",
            medicalHistory: [
              "Previous visit: 2024-01-15",
              "Allergies: Penicillin",
            ],
          }));

        setAppointments(doctorAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
        // Fallback to sample data
        setAppointments(getSampleAppointments());
      }
    } else {
      // No appointments in localStorage, use sample data
      setAppointments(getSampleAppointments());
    }
  };

  const getSampleAppointments = (): Appointment[] => [
    {
      id: "1",
      queueNo: 101,
      patientName: "John Davis",
      reason: "Check-up",
      time: "10:00 AM",
      status: "in-session",
      priority: "routine",
      waitTime: 0,
    },
    {
      id: "2",
      queueNo: 102,
      patientName: "Maria Garcia",
      reason: "Follow-up",
      time: "10:15 AM",
      status: "waiting",
      priority: "moderate",
      waitTime: 15,
    },
    {
      id: "3",
      queueNo: 103,
      patientName: "Robert Lee",
      reason: "Consultation",
      time: "10:30 AM",
      status: "waiting",
      priority: "routine",
      waitTime: 30,
    },
    {
      id: "4",
      queueNo: 104,
      patientName: "Jovin Gorson",
      reason: "Check-up",
      time: "11:00 AM",
      status: "waiting",
      priority: "routine",
      waitTime: 45,
    },
    {
      id: "5",
      queueNo: 105,
      patientName: "Renyinna Smith",
      reason: "Follow-up",
      time: "11:30 AM",
      status: "waiting",
      priority: "moderate",
      waitTime: 60,
    },
    {
      id: "6",
      queueNo: 106,
      patientName: "Green Caterien",
      reason: "Check-up",
      time: "12:00 PM",
      status: "waiting",
      priority: "routine",
      waitTime: 75,
    },
  ];

  const formatAppointmentTime = (index: number) => {
    const baseTime = new Date();
    baseTime.setHours(9, 0, 0, 0);
    baseTime.setMinutes(baseTime.getMinutes() + index * 30);
    return baseTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRandomStatus = (): Appointment["status"] => {
    const statuses: Appointment["status"][] = [
      "waiting",
      "in-session",
      "completed",
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomPriority = (): Appointment["priority"] => {
    const priorities: Appointment["priority"][] = [
      "routine",
      "moderate",
      "urgent",
    ];
    return priorities[Math.floor(Math.random() * priorities.length)];
  };

  const loadNotifications = () => {
    const storedNotifications = localStorage.getItem(
      "clinicflow_doctor_notifications"
    );
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications));
      } catch (error) {
        console.error("Error loading notifications:", error);
        setNotifications([
          "New patient booked: Robert Lee at 2:30 PM",
          "Appointment completed: Maria Garcia",
          "Patient waiting 25+ minutes: John Davis",
        ]);
      }
    } else {
      setNotifications([
        "New patient booked: Robert Lee at 2:30 PM",
        "Appointment completed: Maria Garcia",
        "Patient waiting 25+ minutes: John Davis",
      ]);
    }
  };

  const updateStats = () => {
    const patientsToday = appointments.length;
    const currentlyWaiting = appointments.filter(
      (a) => a.status === "waiting"
    ).length;
    const completedToday = appointments.filter(
      (a) => a.status === "completed"
    ).length;
    const waitingAppointments = appointments.filter(
      (a) => a.status === "waiting"
    );
    const averageWaitTime =
      waitingAppointments.length > 0
        ? Math.round(
            waitingAppointments.reduce((sum, a) => sum + (a.waitTime || 0), 0) /
              waitingAppointments.length
          )
        : 0;

    setStats({
      patientsToday,
      patientsYesterday: patientsToday - 3,
      currentlyWaiting,
      averageWaitTime,
      completedToday,
      satisfactionScore: 4.8,
    });
  };

  // Appointment Actions
  const startAppointment = (appointmentId: string) => {
    Swal.fire({
      title: "Start Appointment",
      text: "Begin consultation with this patient?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Start Session",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAppointments = appointments.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, status: "in-session" as const, waitTime: 0 }
            : apt
        );
        setAppointments(updatedAppointments);
        saveAppointments(updatedAppointments);

        Swal.fire("Started!", "Appointment session has begun.", "success");
      }
    });
  };

  const completeAppointment = (appointmentId: string) => {
    Swal.fire({
      title: "Complete Appointment",
      text: "Mark this appointment as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Complete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedAppointments = appointments.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, status: "completed" as const }
            : apt
        );
        setAppointments(updatedAppointments);
        saveAppointments(updatedAppointments);

        Swal.fire("Completed!", "Appointment marked as completed.", "success");
      }
    });
  };

  const viewPatientDetails = (appointment: Appointment) => {
    Swal.fire({
      title: "Patient Details",
      html: `
        <div class="text-left">
          <h4 class="font-bold text-lg mb-2">${appointment.patientName}</h4>
          <p><strong>Appointment:</strong> ${appointment.reason}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Status:</strong> ${appointment.status}</p>
          <p><strong>Priority:</strong> ${appointment.priority}</p>
          ${
            appointment.medicalHistory
              ? `
            <div class="mt-3">
              <p class="font-bold mb-1">Medical History:</p>
              <ul class="list-disc pl-4">
                ${appointment.medicalHistory
                  .map((item) => `<li>${item}</li>`)
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#3085d6",
    });
  };

  const addPatientNotes = (appointmentId: string) => {
    Swal.fire({
      title: "Add Patient Notes",
      input: "textarea",
      inputLabel: "Notes/Diagnosis",
      inputPlaceholder: "Enter your notes here...",
      showCancelButton: true,
      confirmButtonText: "Save Notes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedAppointments = appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, notes: result.value } : apt
        );
        setAppointments(updatedAppointments);
        saveAppointments(updatedAppointments);

        Swal.fire("Saved!", "Notes have been added.", "success");
      }
    });
  };

  const moveToNext = () => {
    const waitingAppointments = appointments.filter(
      (a) => a.status === "waiting"
    );
    if (waitingAppointments.length > 0) {
      const nextAppointment = waitingAppointments[0];
      startAppointment(nextAppointment.id);
    } else {
      Swal.fire("No Patients", "No patients are currently waiting.", "info");
    }
  };

  const saveAppointments = (updatedAppointments: Appointment[]) => {
    localStorage.setItem(
      "clinicflow_doctor_appointments",
      JSON.stringify(updatedAppointments)
    );
  };

  const addNewPatient = () => {
    Swal.fire({
      title: "Add New Patient",
      html: `
        <input id="patient-name" class="swal2-input" placeholder="Patient Name">
        <input id="patient-reason" class="swal2-input" placeholder="Reason for Visit">
        <input id="patient-time" class="swal2-input" placeholder="Appointment Time (e.g., 2:30 PM)">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Patient",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const name = (
          document.getElementById("patient-name") as HTMLInputElement
        ).value;
        const reason = (
          document.getElementById("patient-reason") as HTMLInputElement
        ).value;
        const time = (
          document.getElementById("patient-time") as HTMLInputElement
        ).value;

        if (!name || !reason || !time) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }

        return { name, reason, time };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, reason, time } = result.value;
        const newAppointment: Appointment = {
          id: `appt_${Date.now()}`,
          queueNo: appointments.length + 101,
          patientName: name,
          reason,
          time,
          status: "waiting",
          priority: "routine",
          waitTime: 0,
        };

        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        saveAppointments(updatedAppointments);

        Swal.fire(
          "Added!",
          "New patient has been added to the queue.",
          "success"
        );
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("clinicflow_user");
        localStorage.removeItem("clinicflow_user_type");
        localStorage.removeItem("clinicflow_user_email");
        localStorage.removeItem("clinicflow_user_firstName");
        localStorage.removeItem("clinicflow_user_lastName");
        localStorage.removeItem("clinicflow_user_fullName");
        navigate("/");
      }
    });
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "in-session":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Appointment["priority"]) => {
    switch (priority) {
      case "routine":
        return "text-green-600";
      case "moderate":
        return "text-yellow-600";
      case "urgent":
        return "text-orange-600";
      case "emergency":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPriorityIcon = (priority: Appointment["priority"]) => {
    switch (priority) {
      case "routine":
        return "🟢";
      case "moderate":
        return "🟡";
      case "urgent":
        return "🔴";
      case "emergency":
        return "⚫";
      default:
        return "⚪";
    }
  };

  // Get doctor initials
  const getDoctorInitials = () => {
    if (!doctorName) return "DR";
    return doctorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Fixed for both mobile and desktop */}
      <div
        className={`
        fixed z-50 h-full
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }
        w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white 
        transition-transform duration-300 ease-in-out flex flex-col
      `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">
              Clinic<span className="text-blue-200">Flow</span>
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-blue-700 rounded-lg md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Doctor Profile */}
          <div className="mb-6 p-3 bg-blue-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">
                  {getDoctorInitials()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">
                  Dr. {doctorName.split(" ")[0]}
                </p>
                <p className="text-sm text-blue-200 truncate">
                  {doctorSpecialty}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-1">
            <Link
              to="/doctorhome"
              className="flex items-center p-3 bg-blue-700 rounded-lg"
              onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            >
              <Home className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/patients"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            >
              <Users className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Patients</span>
            </Link>

            <Link
              to="/doctoravailability"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            >
              <Calendar className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Availability</span>
            </Link>

            <Link
              to="/reports"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            >
              <BarChart className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Reports</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-red-300 hover:text-red-100 hover:bg-red-900/20 rounded-lg w-full"
          >
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content - Adjusted for fixed sidebar */}
      <div className="flex-1 overflow-auto md:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center w-full sm:w-auto justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Doctor Dashboard
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Welcome back, Dr. {doctorName.split(" ")[0]}
                  </p>
                </div>
              </div>

              {/* Mobile Stats */}
              <div className="flex items-center gap-3 sm:hidden">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Today</p>
                  <p className="text-lg font-bold text-blue-600">
                    {stats.patientsToday}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Waiting</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {stats.currentlyWaiting}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              {/* Desktop Quick Stats */}
              <div className="hidden sm:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Today{`'`}s Patients</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.patientsToday}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Waiting</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.currentlyWaiting}
                  </p>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Doctor Avatar */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-sm sm:text-base">
                  {getDoctorInitials()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-blue-50 rounded-lg mr-3 sm:mr-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Patients Today
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {stats.patientsToday}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {stats.patientsToday > stats.patientsYesterday ? "↑" : "↓"}
                    {Math.abs(
                      stats.patientsToday - stats.patientsYesterday
                    )}{" "}
                    from yesterday
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-yellow-50 rounded-lg mr-3 sm:mr-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Currently Waiting
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {stats.currentlyWaiting}
                  </p>
                  <p className="text-xs sm:text-sm text-yellow-600 flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Avg wait: {stats.averageWaitTime} min
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 sm:p-3 bg-green-50 rounded-lg mr-3 sm:mr-4">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Completed Today
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {stats.completedToday}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Satisfaction: {stats.satisfactionScore}/5 ⭐
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Quick Actions
            </h3>
            <div className="flex overflow-x-auto pb-2 -mx-1 px-1 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-3 sm:overflow-visible">
              <button
                onClick={addNewPatient}
                className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center min-w-[120px] sm:min-w-0 flex-shrink-0 mr-2 sm:mr-0"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-center">
                  Add Patient
                </span>
              </button>

              <button
                onClick={moveToNext}
                className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center min-w-[120px] sm:min-w-0 flex-shrink-0 mr-2 sm:mr-0"
              >
                <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-center">
                  Next Patient
                </span>
              </button>

              <Link
                to="/doctoravailability"
                className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center min-w-[120px] sm:min-w-0 flex-shrink-0 mr-2 sm:mr-0"
              >
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-center">
                  Availability
                </span>
              </Link>

              <Link
                to="/reports"
                className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center min-w-[120px] sm:min-w-0 flex-shrink-0 sm:mr-0"
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-center">
                  Reports
                </span>
              </Link>
            </div>
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Notifications
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-start p-2 sm:p-3 bg-yellow-50 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-yellow-800">
                        {notification}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appointment Queue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <h3 className="text-base sm:text-lg font-semibold">
                Today{`'`}s Appointment Queue
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  {appointments.filter((a) => a.status === "in-session").length}{" "}
                  in session •{` `}
                  {
                    appointments.filter((a) => a.status === "waiting").length
                  }{" "}
                  waiting
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Queue
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Patient
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Reason
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Time
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Priority
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-gray-900">
                        #{apt.queueNo}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {apt.patientName}
                          </p>
                          {apt.waitTime && apt.status === "waiting" && (
                            <p className="text-xs text-gray-500">
                              Waiting: {apt.waitTime} min
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 truncate max-w-[120px]">
                        {apt.reason}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        {apt.time}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span
                          className={`font-medium text-xs sm:text-sm ${getPriorityColor(
                            apt.priority
                          )}`}
                        >
                          {getPriorityIcon(apt.priority)}{" "}
                          {apt.priority.charAt(0).toUpperCase() +
                            apt.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span
                          className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            apt.status
                          )}`}
                        >
                          {apt.status === "in-session"
                            ? "In Session"
                            : apt.status.charAt(0).toUpperCase() +
                              apt.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          {apt.status === "waiting" && (
                            <button
                              onClick={() => startAppointment(apt.id)}
                              className="p-1 sm:p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                              title="Start Appointment"
                            >
                              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          )}
                          {apt.status === "in-session" && (
                            <button
                              onClick={() => completeAppointment(apt.id)}
                              className="p-1 sm:p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                              title="Complete Appointment"
                            >
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => viewPatientDetails(apt)}
                            className="p-1 sm:p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                            title="View Details"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => addPatientNotes(apt.id)}
                            className="p-1 sm:p-1.5 bg-purple-100 text-purple-600 rounded hover:bg-purple-200"
                            title="Add Notes"
                          >
                            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm text-gray-600">
                <div>
                  <span className="font-medium">Today{`'`}s Summary:</span>{" "}
                  {stats.completedToday} completed • {stats.currentlyWaiting}{" "}
                  waiting • {stats.averageWaitTime} min avg wait
                </div>
                <button
                  onClick={moveToNext}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  Call Next Patient{" "}
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Display */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Dr. {doctorName}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {doctorSpecialty}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-amber-500 text-sm sm:text-base">
                    ⭐⭐⭐⭐⭐
                  </span>
                  <span className="ml-2 text-gray-700 text-xs sm:text-sm">
                    4.8/5 (128 reviews)
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-600">
                  <p className="truncate">Contact: {doctorEmail}</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Available: Mon-Fri, 9:00 AM - 5:00 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500">
                  Daily Capacity
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {appointments.length}/20
                </p>
                <div className="w-40 sm:w-48 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(appointments.length / 20) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;

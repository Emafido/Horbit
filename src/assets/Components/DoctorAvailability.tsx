// components/DoctorManageAvailabilityCompact.tsx
import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Clock,
  Users,
  Save,
  LogOut,
  Calendar,
  Edit2,
  Menu,
  X,
  Home,
  Bell,
  User,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface DaySchedule {
  name: string;
  open: boolean;
  slots: string[];
}

const DoctorAvailability: React.FC = () => {
  const [days, setDays] = useState<DaySchedule[]>([
    { name: "Monday", open: true, slots: ["09:00 - 17:00"] },
    { name: "Tuesday", open: true, slots: ["09:00 - 17:00"] },
    { name: "Wednesday", open: true, slots: ["09:00 - 17:00"] },
    { name: "Thursday", open: true, slots: ["09:00 - 17:00"] },
    { name: "Friday", open: true, slots: ["09:00 - 17:00"] },
    { name: "Saturday", open: false, slots: [] },
    { name: "Sunday", open: false, slots: [] },
  ]);

  const [consultTime, setConsultTime] = useState(30);
  const [maxPatients, setMaxPatients] = useState(20);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load doctor data and saved availability
  useEffect(() => {
    loadDoctorData();
    loadSavedAvailability();
  }, []);

  const loadDoctorData = () => {
    const storedUser = localStorage.getItem("clinicflow_user");
    const storedDoctors = localStorage.getItem("clinicflow_doctors");

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.userType === "doctor") {
          setDoctorName(`${userData.firstName} ${userData.lastName}`);
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

  const loadSavedAvailability = () => {
    const savedAvailability = localStorage.getItem(
      "clinicflow_doctor_availability"
    );
    if (savedAvailability) {
      try {
        const {
          days: savedDays,
          consultTime: savedConsultTime,
          maxPatients: savedMaxPatients,
        } = JSON.parse(savedAvailability);
        setDays(savedDays);
        setConsultTime(savedConsultTime);
        setMaxPatients(savedMaxPatients);
      } catch (error) {
        console.error("Error loading saved availability:", error);
      }
    }
  };

  const toggleDay = (index: number) => {
    const newDays = [...days];
    newDays[index].open = !newDays[index].open;
    if (!newDays[index].open) {
      newDays[index].slots = [];
    } else if (newDays[index].slots.length === 0) {
      newDays[index].slots = ["09:00 - 17:00"];
    }
    setDays(newDays);
  };

  const addSlot = (index: number) => {
    if (days[index].slots.length >= 5) {
      Swal.fire("Limit Reached", "Maximum 5 slots per day allowed", "info");
      return;
    }

    Swal.fire({
      title: "Add Time Slot",
      html: `
        <div class="text-left">
          <label class="block mb-2">Start Time</label>
          <input id="start-time" type="time" class="swal2-input mb-4" value="09:00">
          <label class="block mb-2">End Time</label>
          <input id="end-time" type="time" class="swal2-input" value="17:00">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Add Slot",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const startTime = (
          document.getElementById("start-time") as HTMLInputElement
        ).value;
        const endTime = (
          document.getElementById("end-time") as HTMLInputElement
        ).value;

        if (!startTime || !endTime) {
          Swal.showValidationMessage("Please fill in both times");
          return false;
        }

        return { startTime, endTime };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { startTime, endTime } = result.value;
        const newDays = [...days];
        newDays[index].slots.push(`${startTime} - ${endTime}`);
        setDays(newDays);
      }
    });
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    Swal.fire({
      title: "Remove Time Slot",
      text: "Are you sure you want to remove this time slot?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const newDays = [...days];
        newDays[dayIndex].slots.splice(slotIndex, 1);
        setDays(newDays);
      }
    });
  };

  const editSlot = (
    dayIndex: number,
    slotIndex: number,
    currentSlot: string
  ) => {
    const [currentStart, currentEnd] = currentSlot.split(" - ");

    Swal.fire({
      title: "Edit Time Slot",
      html: `
        <div class="text-left">
          <label class="block mb-2">Start Time</label>
          <input id="edit-start-time" type="time" class="swal2-input mb-4" value="${currentStart}">
          <label class="block mb-2">End Time</label>
          <input id="edit-end-time" type="time" class="swal2-input" value="${currentEnd}">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const startTime = (
          document.getElementById("edit-start-time") as HTMLInputElement
        ).value;
        const endTime = (
          document.getElementById("edit-end-time") as HTMLInputElement
        ).value;

        if (!startTime || !endTime) {
          Swal.showValidationMessage("Please fill in both times");
          return false;
        }

        return { startTime, endTime };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { startTime, endTime } = result.value;
        const newDays = [...days];
        newDays[dayIndex].slots[slotIndex] = `${startTime} - ${endTime}`;
        setDays(newDays);
      }
    });
  };

  const saveAvailability = () => {
    const availabilityData = {
      days,
      consultTime,
      maxPatients,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(
      "clinicflow_doctor_availability",
      JSON.stringify(availabilityData)
    );

    const storedDoctors = localStorage.getItem("clinicflow_doctors");
    if (storedDoctors) {
      try {
        const doctors = JSON.parse(storedDoctors);
        const currentDoctorEmail = localStorage.getItem(
          "clinicflow_user_email"
        );
        const updatedDoctors = doctors.map((doctor: any) =>
          doctor.email === currentDoctorEmail
            ? { ...doctor, availability: availabilityData }
            : doctor
        );
        localStorage.setItem(
          "clinicflow_doctors",
          JSON.stringify(updatedDoctors)
        );
      } catch (error) {
        console.error("Error updating doctor availability:", error);
      }
    }

    Swal.fire({
      title: "Saved!",
      text: "Your availability settings have been saved.",
      icon: "success",
      confirmButtonColor: "#3085d6",
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

  const getDoctorInitials = () => {
    if (!doctorName) return "DR";
    return doctorName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const openDaysCount = days.filter((d) => d.open).length;
  const totalSlotsCount = days.reduce((sum, day) => sum + day.slots.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Fixed Top Header - Mobile Only */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30 lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Availability</h1>
              <p className="text-xs text-gray-600">Set your schedule</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {getDoctorInitials()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:hidden
      `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">
              Clinic<span className="text-blue-200">Flow</span>
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-blue-700 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Doctor Profile */}
          <div className="mb-6 p-3 bg-blue-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">
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
              to="/doctorshome"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/doctorspatients"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5 mr-3" />
              <span>Patients</span>
            </Link>

            <div className="flex items-center p-3 bg-blue-700 rounded-lg">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Availability</span>
            </div>

            <Link
              to="/doctorssettings"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-red-300 hover:text-red-100 hover:bg-red-900/20 rounded-lg w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="flex flex-col w-full p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Clinic<span className="text-blue-200">Flow</span>
            </h1>
          </div>

          {/* Doctor Profile */}
          <div className="mb-8 p-4 bg-blue-800 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">
                  {getDoctorInitials()}
                </span>
              </div>
              <div>
                <p className="font-semibold">Dr. {doctorName.split(" ")[0]}</p>
                <p className="text-sm text-blue-200">{doctorSpecialty}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2 flex-1">
            <Link
              to="/doctorshome"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/doctorspatients"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <User className="w-5 h-5 mr-3" />
              <span>Patients</span>
            </Link>

            <div className="flex items-center p-3 bg-blue-700 rounded-lg">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Availability</span>
            </div>

            <Link
              to="/doctorssettings"
              className="flex items-center p-3 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center p-3 text-red-300 hover:text-red-100 hover:bg-red-900/20 rounded-lg mt-auto transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-6 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Manage Availability
                  </h1>
                  <p className="text-gray-600">
                    Set your weekly schedule and preferences
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Welcome,</p>
                  <p className="font-medium text-gray-900">
                    {doctorName || "Doctor"}
                  </p>
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Days Grid */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-2 lg:gap-0">
                  <h2 className="text-xl font-bold text-gray-900">
                    Weekly Schedule
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Click on days to toggle availability</span>
                  </div>
                </div>

                {/* Days Grid - FIXED: 1 column on mobile, max 4 columns on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
                  {days.map((day, index) => (
                    <div
                      key={day.name}
                      className={`border rounded-xl p-4 transition-all duration-200 min-h-[200px] flex flex-col ${
                        day.open
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`font-bold truncate ${
                            day.open ? "text-blue-700" : "text-gray-500"
                          }`}
                        >
                          <span className="hidden sm:inline">{day.name}</span>
                          <span className="sm:hidden">
                            {day.name.substring(0, 3)}
                          </span>
                        </span>
                        <button
                          onClick={() => toggleDay(index)}
                          className={`w-10 h-5 lg:w-12 lg:h-6 rounded-full transition-colors relative flex-shrink-0 ${
                            day.open ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 lg:top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                              day.open
                                ? "right-0.5 lg:right-1"
                                : "left-0.5 lg:left-1"
                            }`}
                          />
                        </button>
                      </div>

                      {day.open ? (
                        <div className="space-y-2 flex-1 overflow-y-auto max-h-[140px]">
                          {day.slots.map((slot, slotIndex) => (
                            <div
                              key={slotIndex}
                              className="group flex items-center justify-between bg-white p-2 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <button
                                  onClick={() =>
                                    editSlot(index, slotIndex, slot)
                                  }
                                  className="text-left flex-1 hover:text-blue-600 min-w-0"
                                  title="Edit time slot"
                                >
                                  <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600 truncate block">
                                    {slot}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    editSlot(index, slotIndex, slot)
                                  }
                                  className="text-blue-400 hover:text-blue-600 p-1 hidden group-hover:block"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeSlot(index, slotIndex)}
                                className="text-red-400 hover:text-red-600 p-1 ml-1"
                                title="Remove"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={() => addSlot(index)}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-xs font-medium w-full justify-center p-2 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all mt-2"
                          >
                            <Plus className="w-3 h-3" />
                            Add Slot
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-6 flex-1 flex items-center justify-center">
                          <p className="text-sm text-gray-500">Not Available</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">
                  Clinic Settings
                </h3>

                <div className="space-y-8">
                  {/* Consult Time */}
                  <div>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-2 lg:gap-0">
                      <div className="flex-1">
                        <label className="font-medium text-gray-700 block">
                          Default Consultation Time
                        </label>
                        <p className="text-sm text-gray-500">
                          Time allocated per patient
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-lg lg:text-xl font-bold text-gray-900">
                          {consultTime} min
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={consultTime}
                      onChange={(e) => setConsultTime(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>5 min</span>
                      <span>30 min</span>
                      <span>60 min</span>
                    </div>
                  </div>

                  {/* Max Patients */}
                  <div>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-2 lg:gap-0">
                      <div className="flex-1">
                        <label className="font-medium text-gray-700 block">
                          Maximum Patients Per Day
                        </label>
                        <p className="text-sm text-gray-500">
                          Daily patient capacity
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-500" />
                        <span className="text-lg lg:text-xl font-bold text-gray-900">
                          {maxPatients}
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={maxPatients}
                      onChange={(e) => setMaxPatients(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>5</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={saveAvailability}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 lg:py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Availability Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Stats and Summary */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 lg:p-6 text-white">
                <h3 className="font-bold text-lg mb-6">Availability Summary</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-200 mb-1">Open Days</p>
                    <p className="text-2xl lg:text-3xl font-bold">
                      {openDaysCount}/7
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-blue-200 mb-1">Total Slots</p>
                    <p className="text-2xl lg:text-3xl font-bold">
                      {totalSlotsCount}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-blue-200 mb-1">Consult Time</p>
                    <p className="text-xl lg:text-2xl font-bold">
                      {consultTime} min
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-blue-200 mb-1">Daily Capacity</p>
                    <p className="text-xl lg:text-2xl font-bold">
                      {maxPatients}
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <span className="text-xl lg:text-2xl font-bold text-blue-600">
                      {getDoctorInitials()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">
                      Dr. {doctorName.split(" ")[0]}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Availability Settings
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-medium">Just now</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h4 className="font-bold text-gray-900 mb-4">Quick Tips</h4>
                <ul className="space-y-2 lg:space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>
                      Set realistic consultation times to avoid delays
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Consider buffer time between appointments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                    <span>Update your schedule regularly for accuracy</span>
                  </li>
                </ul>
              </div>

              {/* Days Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                <h4 className="font-bold text-gray-900 mb-4">Days Summary</h4>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((day) => (
                    <div
                      key={day.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium truncate">
                        {day.name.substring(0, 3)}
                      </span>
                      {day.open ? (
                        <span className="text-green-600 text-xs">
                          {day.slots.length} slot
                          {day.slots.length !== 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorAvailability;

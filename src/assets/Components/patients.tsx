// pages/PatientsPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  User,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  nextAppointment: string;
  status: "active" | "pending" | "inactive";
  phone: string;
  email: string;
}

const PatientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Alex Johnson",
      age: 32,
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "alex@email.com",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-20",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Miller",
      age: 45,
      gender: "Female",
      phone: "+1 (555) 987-6543",
      email: "sarah@email.com",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-25",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Chen",
      age: 28,
      gender: "Male",
      phone: "+1 (555) 456-7890",
      email: "michael@email.com",
      lastVisit: "2024-01-05",
      nextAppointment: "2024-02-18",
      status: "pending",
    },
    {
      id: 4,
      name: "Emma Wilson",
      age: 56,
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "emma@email.com",
      lastVisit: "2023-12-20",
      nextAppointment: "2024-03-01",
      status: "inactive",
    },
    {
      id: 5,
      name: "David Brown",
      age: 40,
      gender: "Male",
      phone: "+1 (555) 345-6789",
      email: "david@email.com",
      lastVisit: "2024-01-18",
      nextAppointment: "2024-02-22",
      status: "active",
    },
    {
      id: 6,
      name: "Lisa Taylor",
      age: 35,
      gender: "Female",
      phone: "+1 (555) 567-8901",
      email: "lisa@email.com",
      lastVisit: "2024-01-22",
      nextAppointment: "2024-03-05",
      status: "pending",
    },
    {
      id: 7,
      name: "James Wilson",
      age: 50,
      gender: "Male",
      phone: "+1 (555) 678-9012",
      email: "james@email.com",
      lastVisit: "2024-01-25",
      nextAppointment: "2024-02-28",
      status: "active",
    },
    {
      id: 8,
      name: "Sophia Garcia",
      age: 29,
      gender: "Female",
      phone: "+1 (555) 789-0123",
      email: "sophia@email.com",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-02-15",
      status: "active",
    },
  ]);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    status: "active" as const,
  });

  // Filter and search functionality
  const filteredPatients = useMemo(() => {
    let filtered = patients;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.email.toLowerCase().includes(query) ||
          patient.phone.includes(query) ||
          patient.id.toString().includes(query)
      );
    }

    // Apply status filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (patient) => patient.status === selectedFilter
      );
    }

    return filtered;
  }, [patients, searchQuery, selectedFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = patients.length;
    const active = patients.filter((p) => p.status === "active").length;
    const pending = patients.filter((p) => p.status === "pending").length;
    const inactive = patients.filter((p) => p.status === "inactive").length;
    const newThisMonth = patients.filter((p) => {
      const lastVisit = new Date(p.lastVisit);
      const now = new Date();
      return (
        lastVisit.getMonth() === now.getMonth() &&
        lastVisit.getFullYear() === now.getFullYear()
      );
    }).length;

    return [
      {
        title: "Total Patients",
        value: total.toString(),
        change: "+12%",
        color: "blue",
      },
      {
        title: "Active Today",
        value: active.toString(),
        change: "+3",
        color: "green",
      },
      {
        title: "Pending",
        value: pending.toString(),
        change: "-2",
        color: "amber",
      },
      {
        title: "New This Month",
        value: newThisMonth.toString(),
        change: "+18%",
        color: "purple",
      },
    ];
  }, [patients]);

  const getStatusBadge = (status: Patient["status"]) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      pending: "bg-amber-100 text-amber-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age) {
      alert("Please fill in all required fields");
      return;
    }

    const newPatientObj: Patient = {
      id: patients.length + 1,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone,
      email: newPatient.email,
      lastVisit: new Date().toISOString().split("T")[0],
      nextAppointment: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .split("T")[0],
      status: newPatient.status,
    };

    setPatients((prev) => [...prev, newPatientObj]);
    setNewPatient({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      email: "",
      status: "active",
    });
    setShowNewPatientModal(false);
  };

  const handleDeletePatient = (id: number) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Mobile Menu Button */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                Patients
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage and view all patient records
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg bg-white border border-gray-300"
              >
                <Filter className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowNewPatientModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add New Patient</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200"
            >
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                {stat.title}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <span
                  className={`text-xs sm:text-sm ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl p-3 sm:p-4 mb-4 shadow-sm border border-gray-200">
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search patients by name, ID, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                {["All", "Active", "Pending", "Inactive"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setSelectedFilter(filter.toLowerCase());
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      selectedFilter === filter.toLowerCase()
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Filter Buttons */}
          <div className="hidden sm:flex gap-2 mt-4 sm:mt-0">
            {["All", "Active", "Pending", "Inactive"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base ${
                  selectedFilter === filter.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              Clear search
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Patients Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Patient
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Last Visit
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Next Appointment
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {patient.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {patient.age} yrs • {patient.gender}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[200px]">
                            {patient.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{patient.lastVisit}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {patient.nextAppointment}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(patient.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patients Cards - Mobile & Tablet */}
        <div className="lg:hidden space-y-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {patient.name}
                      </p>
                      <p className="text-gray-500">
                        {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 truncate">
                      {patient.email}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Last Visit</p>
                    <p className="font-medium">{patient.lastVisit}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">
                      Next Appointment
                    </p>
                    <p className="font-medium">{patient.nextAppointment}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {getStatusBadge(patient.status)}
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500">No patients found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  Clear search and try again
                </button>
              )}
            </div>
          )}
        </div>

        {/* No Results Message - Desktop */}
        {filteredPatients.length === 0 && (
          <div className="hidden lg:flex bg-white rounded-xl p-8 text-center justify-center items-center">
            <div>
              <p className="text-gray-500 text-lg mb-2">No patients found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Clear search and try again
                </button>
              )}
            </div>
          </div>
        )}

        {/* Add New Patient Modal */}
        {showNewPatientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Add New Patient
                  </h2>
                  <button
                    onClick={() => setShowNewPatientModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddPatient} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newPatient.name}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age *
                      </label>
                      <input
                        type="number"
                        value={newPatient.age}
                        onChange={(e) =>
                          setNewPatient({ ...newPatient, age: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={newPatient.gender}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            gender: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newPatient.phone}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newPatient.status}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          status: e.target.value as "active",
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewPatientModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Add Patient
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Floating Add Button for Mobile */}
        <button
          onClick={() => setShowNewPatientModal(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-40"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PatientsPage;

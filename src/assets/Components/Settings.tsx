// pages/SettingsPage.tsx
import React, { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  CreditCard,
  Users,
  Moon,
  Download,
  Save,
  X,
  Sun,
  Smartphone,
  Mail,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    clinicName: "Central Medical Clinic",
    clinicAddress: "123 Medical Street, Health City, HC 12345",
    clinicPhone: "+1 (555) 123-4567",
    clinicEmail: "info@centralmedical.com",
    timeZone: "Eastern Time (ET)",
    language: "English",
    dateFormat: "MM/DD/YYYY",
    theme: "light" as "light" | "dark" | "auto",
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    appointmentReminders: true,
    queueUpdates: true,
    prescriptionReady: true,
    labResults: false,
    newsletter: false,
  });

  // Security State
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordChangeRequired: false,
    showPassword: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Billing State
  const [billing, setBilling] = useState({
    paymentMethods: [
      { id: 1, type: "visa", last4: "4242", expiry: "12/24", isDefault: true },
      {
        id: 2,
        type: "mastercard",
        last4: "8888",
        expiry: "06/25",
        isDefault: false,
      },
    ],
    billingCycle: "monthly",
    autoRenew: true,
  });

  // Team State
  const [team, setTeam] = useState({
    members: [
      {
        id: 1,
        name: "Dr. Sarah Chen",
        role: "Head Doctor",
        email: "sarah@clinic.com",
        status: "active",
      },
      {
        id: 2,
        name: "Nurse Emily Wilson",
        role: "Senior Nurse",
        email: "emily@clinic.com",
        status: "active",
      },
      {
        id: 3,
        name: "Dr. Michael Rodriguez",
        role: "Physician",
        email: "michael@clinic.com",
        status: "pending",
      },
      {
        id: 4,
        name: "Receptionist Lisa Taylor",
        role: "Front Desk",
        email: "lisa@clinic.com",
        status: "active",
      },
    ],
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    email: "",
    role: "Staff",
  });

  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const settingsSections = [
    {
      id: "general",
      title: "General",
      icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Clinic profile & preferences",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <Bell className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Alerts & reminders",
    },
    {
      id: "security",
      title: "Security",
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Password & privacy",
    },
    {
      id: "billing",
      title: "Billing",
      icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Payments & plans",
    },
    {
      id: "team",
      title: "Team",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Staff management",
    },
  ];

  const handleGeneralChange = (key: string, value: string | boolean) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    setHasUnsavedChanges(true);
  };

  const handleSecurityChange = (
    key: string,
    value: string | boolean | number
  ) => {
    setSecurity((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleAddPaymentMethod = () => {
    const newMethod = {
      id: billing.paymentMethods.length + 1,
      type: "visa" as const,
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: "12/26",
      isDefault: false,
    };
    setBilling((prev) => ({
      ...prev,
      paymentMethods: [...prev.paymentMethods, newMethod],
    }));
    setHasUnsavedChanges(true);
  };

  const handleRemovePaymentMethod = (id: number) => {
    if (window.confirm("Remove this payment method?")) {
      setBilling((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter(
          (method) => method.id !== id
        ),
      }));
      setHasUnsavedChanges(true);
    }
  };

  const handleSetDefaultPayment = (id: number) => {
    setBilling((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMember.name || !newTeamMember.email) {
      alert("Please fill in all fields");
      return;
    }

    const newMember = {
      id: team.members.length + 1,
      name: newTeamMember.name,
      email: newTeamMember.email,
      role: newTeamMember.role,
      status: "pending" as const,
    };

    setTeam((prev) => ({
      ...prev,
      members: [...prev.members, newMember],
    }));

    setNewTeamMember({ name: "", email: "", role: "Staff" });
    setShowNewMemberModal(false);
    setHasUnsavedChanges(true);
  };

  const handleRemoveTeamMember = (id: number) => {
    if (window.confirm("Remove this team member?")) {
      setTeam((prev) => ({
        ...prev,
        members: prev.members.filter((member) => member.id !== id),
      }));
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveSettings = () => {
    // In a real app, you would make an API call here
    console.log("Saving settings:", {
      generalSettings,
      notifications,
      security,
      billing,
      team,
    });
    setHasUnsavedChanges(false);
    alert("Settings saved successfully!");
  };

  const handleResetSettings = () => {
    if (window.confirm("Reset all changes to last saved state?")) {
      // Reset to initial values
      setGeneralSettings({
        clinicName: "Central Medical Clinic",
        clinicAddress: "123 Medical Street, Health City, HC 12345",
        clinicPhone: "+1 (555) 123-4567",
        clinicEmail: "info@centralmedical.com",
        timeZone: "Eastern Time (ET)",
        language: "English",
        dateFormat: "MM/DD/YYYY",
        theme: "light",
      });
      setNotifications({
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: false,
        appointmentReminders: true,
        queueUpdates: true,
        prescriptionReady: true,
        labResults: false,
        newsletter: false,
      });
      setSecurity({
        twoFactorAuth: false,
        sessionTimeout: 30,
        passwordChangeRequired: false,
        showPassword: false,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setHasUnsavedChanges(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Clinic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic Name *
                  </label>
                  <input
                    type="text"
                    value={generalSettings.clinicName}
                    onChange={(e) =>
                      handleGeneralChange("clinicName", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={generalSettings.clinicPhone}
                    onChange={(e) =>
                      handleGeneralChange("clinicPhone", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={generalSettings.clinicAddress}
                    onChange={(e) =>
                      handleGeneralChange("clinicAddress", e.target.value)
                    }
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={generalSettings.clinicEmail}
                    onChange={(e) =>
                      handleGeneralChange("clinicEmail", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Zone
                  </label>
                  <select
                    value={generalSettings.timeZone}
                    onChange={(e) =>
                      handleGeneralChange("timeZone", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) =>
                      handleGeneralChange("language", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Chinese</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={generalSettings.dateFormat}
                    onChange={(e) =>
                      handleGeneralChange("dateFormat", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Theme
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    id: "light",
                    label: "Light",
                    icon: <Sun className="w-4 h-4" />,
                  },
                  {
                    id: "dark",
                    label: "Dark",
                    icon: <Moon className="w-4 h-4" />,
                  },
                  {
                    id: "auto",
                    label: "Auto",
                    icon: <Settings className="w-4 h-4" />,
                  },
                ].map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => handleGeneralChange("theme", themeOption.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border ${
                      generalSettings.theme === themeOption.id
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {themeOption.icon}
                    <span>{themeOption.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Configure how you receive notifications about appointments,
                reminders, and updates.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Channels
              </h3>

              {[
                {
                  key: "emailNotifications",
                  label: "Email Notifications",
                  description: "Receive notifications via email",
                },
                {
                  key: "smsNotifications",
                  label: "SMS Notifications",
                  description: "Receive text message alerts",
                },
                {
                  key: "pushNotifications",
                  label: "Push Notifications",
                  description: "Receive app notifications",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {item.key === "emailNotifications" ? (
                        <Mail className="w-5 h-5 text-blue-600" />
                      ) : item.key === "smsNotifications" ? (
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Bell className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationToggle(
                        item.key as keyof typeof notifications
                      )
                    }
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Types
              </h3>

              {[
                {
                  key: "appointmentReminders",
                  label: "Appointment Reminders",
                  description: "24h before appointments",
                },
                {
                  key: "queueUpdates",
                  label: "Queue Updates",
                  description: "When wait times change",
                },
                {
                  key: "prescriptionReady",
                  label: "Prescription Ready",
                  description: "When prescriptions are completed",
                },
                {
                  key: "labResults",
                  label: "Lab Results",
                  description: "When test results are available",
                },
                {
                  key: "newsletter",
                  label: "Newsletter",
                  description: "Monthly clinic updates",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationToggle(
                        item.key as keyof typeof notifications
                      )
                    }
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transform transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Manage your password, two-factor authentication, and security
                preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSecurityChange(
                      "twoFactorAuth",
                      !security.twoFactorAuth
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    security.twoFactorAuth ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                      security.twoFactorAuth ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={security.sessionTimeout}
                    onChange={(e) =>
                      handleSecurityChange(
                        "sessionTimeout",
                        parseInt(e.target.value)
                      )
                    }
                    className="flex-1"
                  />
                  <span className="font-medium text-gray-900">
                    {security.sessionTimeout} min
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={security.showPassword ? "text" : "password"}
                      value={security.currentPassword}
                      onChange={(e) =>
                        handleSecurityChange("currentPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() =>
                        handleSecurityChange(
                          "showPassword",
                          !security.showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {security.showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={security.showPassword ? "text" : "password"}
                      value={security.newPassword}
                      onChange={(e) =>
                        handleSecurityChange("newPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={security.showPassword ? "text" : "password"}
                      value={security.confirmPassword}
                      onChange={(e) =>
                        handleSecurityChange("confirmPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input
                  type="checkbox"
                  id="passwordChangeRequired"
                  checked={security.passwordChangeRequired}
                  onChange={(e) =>
                    handleSecurityChange(
                      "passwordChangeRequired",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 text-blue-600"
                />
                <label
                  htmlFor="passwordChangeRequired"
                  className="text-sm text-gray-700"
                >
                  Require password change on next login
                </label>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Methods
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your payment options
                </p>
              </div>
              <button
                onClick={handleAddPaymentMethod}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Plus className="w-4 h-4" />
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {billing.paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-8 rounded flex items-center justify-center ${
                        method.type === "visa" ? "bg-blue-500" : "bg-red-500"
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.type.charAt(0).toUpperCase() +
                          method.type.slice(1)}{" "}
                        •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {method.isDefault ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefaultPayment(method.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Billing Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Cycle
                  </label>
                  <select
                    value={billing.billingCycle}
                    onChange={(e) =>
                      setBilling((prev) => ({
                        ...prev,
                        billingCycle: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-Renew
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setBilling((prev) => ({
                          ...prev,
                          autoRenew: !prev.autoRenew,
                        }))
                      }
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        billing.autoRenew ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transform transition-transform ${
                          billing.autoRenew ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-700">
                      {billing.autoRenew ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Billing History
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">No billing history available</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 justify-center">
                  <Download className="w-4 h-4" />
                  Download Invoice Template
                </button>
              </div>
            </div>
          </div>
        );

      case "team":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Team Members
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your clinic staff and permissions
                </p>
              </div>
              <button
                onClick={() => setShowNewMemberModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                <Users className="w-4 h-4" />
                Add Team Member
              </button>
            </div>

            <div className="space-y-4">
              {team.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {member.role} • {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {member.status.charAt(0).toUpperCase() +
                        member.status.slice(1)}
                    </span>
                    <button
                      onClick={() => handleRemoveTeamMember(member.id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Role Permissions
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Default permissions for each role:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      role: "Doctor",
                      permissions:
                        "Full access, patient management, prescriptions",
                    },
                    {
                      role: "Nurse",
                      permissions:
                        "Patient care, basic records, no prescriptions",
                    },
                    {
                      role: "Receptionist",
                      permissions:
                        "Appointments, check-ins, basic patient info",
                    },
                    { role: "Staff", permissions: "Limited access, view only" },
                  ].map((item) => (
                    <div
                      key={item.role}
                      className="bg-white p-3 rounded-lg border border-gray-200"
                    >
                      <p className="font-medium text-gray-900">{item.role}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.permissions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Settings
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Manage your clinic preferences
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white border border-gray-300"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-700 text-sm">
                You have unsaved changes. Don't forget to save!
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Mobile Settings Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
              <div className="grid grid-cols-2 gap-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveTab(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      activeTab === section.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {section.icon}
                    <span className="text-xs font-medium mt-1">
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-64">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-6">
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left ${
                      activeTab === section.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {section.icon}
                    <div>
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs text-gray-500">
                        {section.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              {/* Tab Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  {settingsSections.find((s) => s.id === activeTab)?.icon}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {settingsSections.find((s) => s.id === activeTab)?.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {
                        settingsSections.find((s) => s.id === activeTab)
                          ?.description
                      }
                    </p>
                  </div>
                </div>

                {/* Mobile Tab Switcher */}
                <div className="lg:hidden">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {settingsSections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">{renderTabContent()}</div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleResetSettings}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Reset Changes
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Add Team Member Modal */}
        {showNewMemberModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Add Team Member
                  </h2>
                  <button
                    onClick={() => setShowNewMemberModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddTeamMember} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newTeamMember.name}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newTeamMember.email}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      value={newTeamMember.role}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          role: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      <option value="Receptionist">Receptionist</option>
                      <option value="Staff">Staff</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowNewMemberModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

// pages/ReportsPage.tsx
import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Filter,
  Calendar,
  FileText,
  Users,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  X,
  Printer,
  Eye,
  Search,
  BarChart,
  LineChart,
  Activity,
} from "lucide-react";

interface Report {
  id: number;
  title: string;
  date: string;
  type: "Revenue" | "Analytics" | "Appointments" | "Summary" | "Performance";
  size: string;
  downloads: number;
  lastGenerated: string;
}

interface StatData {
  label: string;
  value: string;
  change: string;
  color: "green" | "blue" | "purple" | "amber" | "red";
  icon: React.ReactNode;
  trend: "up" | "down";
  details?: string;
}

const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<
    "day" | "week" | "month" | "quarter" | "year"
  >("month");
  const [reportType, setReportType] = useState<
    "revenue" | "patients" | "appointments" | "performance"
  >("revenue");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [reportFilters, setReportFilters] = useState({
    dateFrom: "",
    dateTo: "",
    reportTypes: [] as string[],
    minSize: "",
    sortBy: "date" as "date" | "title" | "size" | "downloads",
  });

  // Chart data based on time range
  const chartData = useMemo(() => {
    const data = {
      day: {
        labels: [
          "9AM",
          "10AM",
          "11AM",
          "12PM",
          "1PM",
          "2PM",
          "3PM",
          "4PM",
          "5PM",
        ],
        revenue: [120, 190, 300, 500, 200, 300, 400, 350, 250],
        patients: [8, 12, 15, 20, 18, 22, 25, 20, 15],
        appointments: [10, 15, 20, 25, 18, 22, 20, 15, 10],
        waitTimes: [5, 8, 12, 15, 10, 14, 12, 8, 6],
      },
      week: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        revenue: [1500, 2300, 3200, 2800, 4000, 1800, 1200],
        patients: [45, 60, 75, 65, 85, 35, 25],
        appointments: [50, 65, 80, 70, 90, 40, 30],
        waitTimes: [10, 12, 15, 14, 18, 8, 6],
      },
      month: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        revenue: [8200, 9500, 8800, 10200],
        patients: [320, 380, 350, 420],
        appointments: [350, 400, 380, 450],
        waitTimes: [12, 14, 13, 16],
      },
      quarter: {
        labels: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
        revenue: [28500, 31200, 29800, 33500],
        patients: [1100, 1250, 1150, 1300],
        appointments: [1200, 1350, 1250, 1400],
        waitTimes: [14, 16, 15, 17],
      },
      year: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        revenue: [
          8200, 9500, 8800, 10200, 11000, 9800, 10500, 11200, 10800, 11500,
          12000, 12500,
        ],
        patients: [320, 380, 350, 420, 450, 400, 430, 460, 440, 480, 500, 520],
        appointments: [
          350, 400, 380, 450, 480, 420, 460, 490, 470, 510, 530, 550,
        ],
        waitTimes: [12, 14, 13, 16, 15, 14, 15, 16, 15, 17, 16, 18],
      },
    };
    return data[timeRange];
  }, [timeRange]);

  // Stats data based on time range
  const stats: StatData[] = useMemo(
    () => [
      {
        label: "Total Revenue",
        value:
          timeRange === "day"
            ? "$2,580"
            : timeRange === "week"
            ? "$16,800"
            : timeRange === "month"
            ? "$36,700"
            : timeRange === "quarter"
            ? "$123,000"
            : "$115,300",
        change:
          timeRange === "day"
            ? "+12%"
            : timeRange === "week"
            ? "+15%"
            : timeRange === "month"
            ? "+18%"
            : timeRange === "quarter"
            ? "+22%"
            : "+25%",
        color: "green",
        icon: <DollarSign className="w-5 h-5" />,
        trend: "up",
        details: "Compared to previous period",
      },
      {
        label: "Patients Seen",
        value:
          timeRange === "day"
            ? "42"
            : timeRange === "week"
            ? "285"
            : timeRange === "month"
            ? "1,470"
            : timeRange === "quarter"
            ? "4,800"
            : "5,280",
        change:
          timeRange === "day"
            ? "+8%"
            : timeRange === "week"
            ? "+10%"
            : timeRange === "month"
            ? "+12%"
            : timeRange === "quarter"
            ? "+15%"
            : "+18%",
        color: "blue",
        icon: <Users className="w-5 h-5" />,
        trend: "up",
        details: "Total unique patients",
      },
      {
        label: "Appointments",
        value:
          timeRange === "day"
            ? "48"
            : timeRange === "week"
            ? "320"
            : timeRange === "month"
            ? "1,680"
            : timeRange === "quarter"
            ? "5,200"
            : "5,750",
        change:
          timeRange === "day"
            ? "+5%"
            : timeRange === "week"
            ? "+7%"
            : timeRange === "month"
            ? "+9%"
            : timeRange === "quarter"
            ? "+12%"
            : "+15%",
        color: "purple",
        icon: <Calendar className="w-5 h-5" />,
        trend: "up",
        details: "Completed appointments",
      },
      {
        label: "Avg. Wait Time",
        value:
          timeRange === "day"
            ? "14min"
            : timeRange === "week"
            ? "13min"
            : timeRange === "month"
            ? "15min"
            : timeRange === "quarter"
            ? "16min"
            : "15min",
        change:
          timeRange === "day"
            ? "-3%"
            : timeRange === "week"
            ? "-5%"
            : timeRange === "month"
            ? "-2%"
            : timeRange === "quarter"
            ? "0%"
            : "-1%",
        color: timeRange === "quarter" ? "amber" : "green",
        icon: <Clock className="w-5 h-5" />,
        trend: timeRange === "quarter" ? "down" : "up",
        details: "Average patient wait time",
      },
    ],
    [timeRange]
  );

  // Reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: "Monthly Revenue Report",
      date: "2024-01-31",
      type: "Revenue",
      size: "2.4 MB",
      downloads: 45,
      lastGenerated: "2 days ago",
    },
    {
      id: 2,
      title: "Patient Analytics Q4 2023",
      date: "2023-12-31",
      type: "Analytics",
      size: "3.1 MB",
      downloads: 28,
      lastGenerated: "1 week ago",
    },
    {
      id: 3,
      title: "Weekly Appointment Summary",
      date: "2024-01-28",
      type: "Appointments",
      size: "1.8 MB",
      downloads: 32,
      lastGenerated: "3 days ago",
    },
    {
      id: 4,
      title: "Quarterly Performance Review",
      date: "2023-12-31",
      type: "Performance",
      size: "4.2 MB",
      downloads: 19,
      lastGenerated: "2 weeks ago",
    },
    {
      id: 5,
      title: "Annual Revenue Report 2023",
      date: "2023-12-31",
      type: "Revenue",
      size: "5.7 MB",
      downloads: 67,
      lastGenerated: "3 weeks ago",
    },
    {
      id: 6,
      title: "Patient Satisfaction Survey",
      date: "2024-01-15",
      type: "Analytics",
      size: "2.9 MB",
      downloads: 21,
      lastGenerated: "5 days ago",
    },
  ]);

  // Filtered reports
  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    if (reportFilters.dateFrom) {
      filtered = filtered.filter(
        (report) => report.date >= reportFilters.dateFrom
      );
    }
    if (reportFilters.dateTo) {
      filtered = filtered.filter(
        (report) => report.date <= reportFilters.dateTo
      );
    }

    // Type filter
    if (reportFilters.reportTypes.length > 0) {
      filtered = filtered.filter((report) =>
        reportFilters.reportTypes.includes(report.type)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (reportFilters.sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "size":
          return parseFloat(b.size) - parseFloat(a.size);
        case "downloads":
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

    return filtered;
  }, [reports, searchQuery, reportFilters]);

  // Get max value for chart scaling
  const getMaxValue = (data: number[]) => Math.max(...data) * 1.1;

  const handleExport = () => {
    if (selectedReports.length === 0) {
      alert("Please select at least one report to export");
      return;
    }

    const selected = reports.filter((r) => selectedReports.includes(r.id));
    console.log("Exporting reports:", selected);
    alert(`Exporting ${selected.length} report(s)...`);
    setShowExportModal(false);
  };

  const handleGenerateReport = () => {
    const newReport: Report = {
      id: reports.length + 1,
      title: `${timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}ly ${
        reportType.charAt(0).toUpperCase() + reportType.slice(1)
      } Report`,
      date: new Date().toISOString().split("T")[0],
      type: (reportType.charAt(0).toUpperCase() + reportType.slice(1)) as any,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      downloads: 0,
      lastGenerated: "Just now",
    };

    setReports((prev) => [newReport, ...prev]);
    alert(`Generated new ${reportType} report for ${timeRange}`);
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map((r) => r.id));
    }
  };

  const handleReportClick = (id: number) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const getTypeColor = (type: Report["type"]) => {
    const colors = {
      Revenue: "bg-green-100 text-green-800",
      Analytics: "bg-blue-100 text-blue-800",
      Appointments: "bg-purple-100 text-purple-800",
      Summary: "bg-amber-100 text-amber-800",
      Performance: "bg-indigo-100 text-indigo-800",
    };
    return colors[type];
  };

  const getReportIcon = (type: Report["type"]) => {
    const icons = {
      Revenue: <DollarSign className="w-4 h-4" />,
      Analytics: <BarChart3 className="w-4 h-4" />,
      Appointments: <Calendar className="w-4 h-4" />,
      Summary: <FileText className="w-4 h-4" />,
      Performance: <Activity className="w-4 h-4" />,
    };
    return icons[type];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                Reports & Analytics
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                View and download clinic performance reports
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleGenerateReport}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Generate Report</span>
                <span className="sm:hidden">Generate</span>
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Calendar className="w-5 h-5 text-gray-500 hidden sm:block" />
                {(["Day", "Week", "Month", "Quarter", "Year"] as const).map(
                  (range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range.toLowerCase() as any)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm sm:text-base ${
                        timeRange === range.toLowerCase()
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {range}
                    </button>
                  )
                )}
              </div>

              {/* Report Type Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Report Type:
                </span>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="revenue">Revenue Reports</option>
                  <option value="patients">Patient Reports</option>
                  <option value="appointments">Appointment Reports</option>
                  <option value="performance">Performance Reports</option>
                </select>

                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Filter Reports</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  value={reportFilters.dateFrom}
                  onChange={(e) =>
                    setReportFilters((prev) => ({
                      ...prev,
                      dateFrom: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  value={reportFilters.dateTo}
                  onChange={(e) =>
                    setReportFilters((prev) => ({
                      ...prev,
                      dateTo: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Types
                </label>
                <select
                  multiple
                  value={reportFilters.reportTypes}
                  onChange={(e) => {
                    const values = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    setReportFilters((prev) => ({
                      ...prev,
                      reportTypes: values,
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-24"
                >
                  <option value="Revenue">Revenue</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Appointments">Appointments</option>
                  <option value="Summary">Summary</option>
                  <option value="Performance">Performance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={reportFilters.sortBy}
                  onChange={(e) =>
                    setReportFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="date">Date (Newest)</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="size">Size (Largest)</option>
                  <option value="downloads">Downloads (Most)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() =>
                  setReportFilters({
                    dateFrom: "",
                    dateTo: "",
                    reportTypes: [],
                    minSize: "",
                    sortBy: "date",
                  })
                }
                className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-gray-100">{stat.icon}</div>
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <ChevronUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-2">{stat.details}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Revenue Overview
                  </h3>
                  <p className="text-sm text-gray-500">
                    $
                    {chartData.revenue
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}{" "}
                    total
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Currency:</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
            <div className="h-48 sm:h-56 flex items-end gap-1 sm:gap-2 px-2">
              {chartData.revenue.map((value, index) => {
                const maxRevenue = getMaxValue(chartData.revenue);
                const height = (value / maxRevenue) * 100;
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-700 cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`$${value.toLocaleString()}`}
                    />
                    <p className="text-xs text-gray-500 text-center mt-2 truncate w-full">
                      {chartData.labels[index]}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Period: {timeRange}</span>
                <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Export Chart
                </button>
              </div>
            </div>
          </div>

          {/* Patient Distribution */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <PieChart className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Patient Distribution
                  </h3>
                  <p className="text-sm text-gray-500">By age groups</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-[16px] border-blue-500"></div>
                <div
                  className="absolute inset-0 rounded-full border-[16px] border-green-500 transform -rotate-60"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-[16px] border-purple-500 transform rotate-45"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-[16px] border-amber-500 transform rotate-120"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {chartData.patients
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Patients</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3 flex-1">
                {[
                  {
                    label: "Children (0-12)",
                    value: "24%",
                    color: "bg-blue-500",
                    patients: 126,
                  },
                  {
                    label: "Teens (13-19)",
                    value: "18%",
                    color: "bg-green-500",
                    patients: 95,
                  },
                  {
                    label: "Adults (20-59)",
                    value: "45%",
                    color: "bg-purple-500",
                    patients: 238,
                  },
                  {
                    label: "Seniors (60+)",
                    value: "13%",
                    color: "bg-amber-500",
                    patients: 68,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${item.color}`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-500">
                        {item.patients} patients
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Select All */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {selectedReports.length} of {filteredReports.length} selected
            </div>
            <button
              onClick={handleSelectAll}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {selectedReports.length === filteredReports.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>
        </div>

        {/* Recent Reports - Desktop */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1 text-sm font-medium text-gray-700"></div>
              <div className="col-span-5 text-sm font-medium text-gray-700">
                Report
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-700">
                Type
              </div>
              <div className="col-span-1 text-sm font-medium text-gray-700">
                Size
              </div>
              <div className="col-span-1 text-sm font-medium text-gray-700">
                Downloads
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-700">
                Actions
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedReports.includes(report.id) ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleReportClick(report.id)}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </div>
                    <div className="col-span-5">
                      <p className="font-medium text-gray-900">
                        {report.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Generated: {report.date} • {report.lastGenerated}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          report.type
                        )}`}
                      >
                        {getReportIcon(report.type)}
                        {report.type}
                      </span>
                    </div>
                    <div className="col-span-1 text-sm text-gray-700">
                      {report.size}
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Download className="w-4 h-4" />
                        {report.downloads}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("View report:", report.id);
                          }}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Download report:", report.id);
                          }}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Print report:", report.id);
                          }}
                          className="p-1 text-gray-600 hover:text-gray-800"
                          title="Print"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No reports found</p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Reports - Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                  selectedReports.includes(report.id)
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleReportClick(report.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        getTypeColor(report.type)
                          .replace("text-", "bg-")
                          .split(" ")[0]
                      }`}
                    >
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedReports.includes(report.id)}
                    onChange={() => {}}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        report.type
                      )}`}
                    >
                      {report.type}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Size</p>
                    <p className="font-medium">{report.size}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Download className="w-4 h-4" />
                      {report.downloads} downloads
                    </div>
                    <span className="text-sm text-gray-500">
                      {report.lastGenerated}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No reports found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Export Reports
                  </h2>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Export Format
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["PDF", "Excel", "CSV", "JSON"].map((format) => (
                        <button
                          key={format}
                          className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
                        >
                          <div className="font-medium text-gray-900">
                            {format}
                          </div>
                          <div className="text-xs text-gray-500">
                            .
                            {format === "Excel" ? "xlsx" : format.toLowerCase()}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selected Reports ({selectedReports.length})
                    </label>
                    <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                      {selectedReports.length > 0 ? (
                        <ul className="space-y-1">
                          {reports
                            .filter((r) => selectedReports.includes(r.id))
                            .slice(0, 5)
                            .map((report) => (
                              <li
                                key={report.id}
                                className="text-sm text-gray-700"
                              >
                                {report.title}
                              </li>
                            ))}
                          {selectedReports.length > 5 && (
                            <li className="text-sm text-gray-500">
                              ...and {selectedReports.length - 5} more
                            </li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No reports selected
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => setShowExportModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExport}
                      disabled={selectedReports.length === 0}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Export Selected
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;

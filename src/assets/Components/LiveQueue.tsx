// components/LiveQueueStatusCompact.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, User, AlertCircle, RefreshCw, ArrowLeft, Bell, Users } from 'lucide-react';
import Swal from 'sweetalert2';

interface QueuePatient {
  id: string;
  name: string;
  status: 'completed' | 'in-session' | 'your-turn' | 'waiting';
  position: number;
  waitTime?: number;
  appointmentTime?: string;
  doctorName?: string;
  isCurrentUser?: boolean;
  patientEmail?: string;
}

const LiveQueue: React.FC = () => {
  const [time, setTime] = useState<string>('10:02 AM');
  const [estimatedWait, setEstimatedWait] = useState<number>(12 * 60 + 30); // 12 mins 30 secs in seconds
  const [queue, setQueue] = useState<QueuePatient[]>([]);
  const [doctorName, setDoctorName] = useState<string>('Dr. Smith');
  const [clinicName, setClinicName] = useState<string>("Dr. Smith's Clinic");
  const [currentUserName, setCurrentUserName] = useState<string>('Alex R.');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const navigate = useNavigate();

  // Load queue data from localStorage
  useEffect(() => {
    loadQueueData();
    
    // Initialize current time
    updateCurrentTime();
    
    // Update time every minute
    const timeInterval = setInterval(() => {
      updateCurrentTime();
    }, 60000);

    // Update wait time every 30 seconds (simulates queue moving)
    const waitInterval = setInterval(() => {
      updateQueueAndWaitTime();
    }, 30000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(waitInterval);
    };
  }, []);

  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    setTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
  };

  const loadQueueData = () => {
    try {
      // Get current patient's info
      const userFullName = localStorage.getItem('clinicflow_user_fullName');
      const firstName = localStorage.getItem('clinicflow_user_firstName');
      const lastName = localStorage.getItem('clinicflow_user_lastName');
      
      // Set current user name
      if (userFullName) {
        const names = userFullName.split(' ');
        setCurrentUserName(`${names[0]} ${names[names.length - 1].charAt(0)}.`);
      } else if (firstName && lastName) {
        setCurrentUserName(`${firstName} ${lastName.charAt(0)}.`);
      }

      // Get current appointment
      const currentAppointment = localStorage.getItem('currentPatientAppointment');
      const appointments = JSON.parse(localStorage.getItem('clinicflow_appointments') || '[]');
      
      let doctorNameFromStorage = 'Dr. Smith';
      if (currentAppointment) {
        const appointment = JSON.parse(currentAppointment);
        doctorNameFromStorage = appointment.doctorName || 'Dr. Smith';
        setDoctorName(doctorNameFromStorage);
        setClinicName(`${doctorNameFromStorage}'s Clinic`);
      } else if (appointments.length > 0) {
        const latestAppointment = appointments[appointments.length - 1];
        doctorNameFromStorage = latestAppointment.doctorName || 'Dr. Smith';
        setDoctorName(doctorNameFromStorage);
        setClinicName(`${doctorNameFromStorage}'s Clinic`);
      }

      // Get patient email for identification
      const patientEmail = localStorage.getItem('clinicflow_user_email');
      
      // Create or load queue
      const savedQueue = localStorage.getItem('liveQueueData');
      let queueData: QueuePatient[] = [];

      if (savedQueue) {
        queueData = JSON.parse(savedQueue);
        
        // Update queue status based on time
        queueData = updateQueueStatus(queueData);
      } else {
        // Create initial queue
        queueData = createInitialQueue(patientEmail, currentUserName);
      }

      // Sort queue by position
      queueData.sort((a, b) => a.position - b.position);
      
      // Update estimated wait time
      const currentUserIndex = queueData.findIndex(p => p.isCurrentUser);
      if (currentUserIndex > 0) {
        // Calculate wait time: 3-5 minutes per person ahead
        const patientsAhead = Math.max(0, currentUserIndex - 2); // Subtract completed and in-session
        const baseWaitTime = patientsAhead * (3 + Math.random() * 2); // 3-5 minutes per patient
        setEstimatedWait(Math.floor(baseWaitTime * 60)); // Convert to seconds
      }
      
      setQueue(queueData);
      
      // Save updated queue
      localStorage.setItem('liveQueueData', JSON.stringify(queueData));
      
    } catch (error) {
      console.error('Error loading queue data:', error);
      // Fallback to sample data
      const fallbackQueue = createInitialQueue('test@email.com', 'Alex R.');
      setQueue(fallbackQueue);
      localStorage.setItem('liveQueueData', JSON.stringify(fallbackQueue));
    }
  };

  const createInitialQueue = (patientEmail: string | null, currentUserName: string): QueuePatient[] => {
    const queueData: QueuePatient[] = [
      {
        id: '1',
        name: 'Sarah J.',
        status: 'completed',
        position: 1,
        appointmentTime: '9:45 AM',
        patientEmail: 'sarah@email.com'
      },
      {
        id: '2',
        name: 'David L.',
        status: 'in-session',
        position: 2,
        patientEmail: 'david@email.com'
      }
    ];

    // Add current patient
    const currentPatient: QueuePatient = {
      id: '3',
      name: currentUserName,
      status: 'your-turn',
      position: 3,
      isCurrentUser: true,
      patientEmail: patientEmail || 'current@email.com'
    };
    queueData.push(currentPatient);

    // Add waiting patients
    const waitingPatients = [
      { id: '4', name: 'Emily W.', position: 4, patientEmail: 'emily@email.com' },
      { id: '5', name: 'Chris B.', position: 5, patientEmail: 'chris@email.com' },
      { id: '6', name: 'Michael K.', position: 6, patientEmail: 'michael@email.com' }
    ];

    waitingPatients.forEach(patient => {
      queueData.push({
        ...patient,
        status: 'waiting',
        waitTime: Math.floor(Math.random() * 15) + 10 // 10-25 minutes
      });
    });

    return queueData;
  };

  const updateQueueStatus = (queueData: QueuePatient[]): QueuePatient[] => {
    const updatedQueue = [...queueData];
    const now = new Date();
  
    
    // Simulate queue progression based on time
    updatedQueue.forEach((patient) => {
      if (patient.status === 'in-session') {
        // If patient has been in session for more than 15 minutes, mark as completed
        // This is simulated - in real app this would come from server
        if (Math.random() > 0.7) { // 30% chance to mark as completed
          patient.status = 'completed';
          patient.appointmentTime = time;
        }
      } else if (patient.status === 'your-turn' && patient.isCurrentUser) {
        // Current patient remains "your-turn" until they are next
        // In reality this would be updated by doctor's system
        patient.waitTime = Math.max(0, (patient.position - 2) * 5);
      } else if (patient.status === 'waiting') {
        // Update wait times for waiting patients
        patient.waitTime = Math.max(0, (patient.position - 2) * 5 - Math.floor(Math.random() * 3));
      }
    });

    // Move completed patients to the end if needed
    return updatedQueue.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (b.status === 'completed' && a.status !== 'completed') return -1;
      return a.position - b.position;
    });
  };

  const updateQueueAndWaitTime = () => {
    setIsRefreshing(true);
    
    // Update the queue
    setQueue(prevQueue => {
      const updatedQueue = updateQueueStatus(prevQueue);
      
      // Update estimated wait time for current user
      const currentUserIndex = updatedQueue.findIndex(p => p.isCurrentUser);
      if (currentUserIndex > 0) {
        const patientsAhead = Math.max(0, currentUserIndex - updatedQueue.filter(p => p.status === 'completed').length - 1);
        const newWaitTime = patientsAhead * (3 + Math.random() * 2); // 3-5 minutes per patient
        
        // Smooth transition for wait time (prevents jumping)
        setEstimatedWait(prev => {
          const targetWait = Math.floor(newWaitTime * 60);
          const diff = targetWait - prev;
          return prev + Math.sign(diff) * Math.min(30, Math.abs(diff) * 0.5); // Smooth adjustment
        });
      }
      
      // Save updated queue
      localStorage.setItem('liveQueueData', JSON.stringify(updatedQueue));
      return updatedQueue;
    });
    
    setIsRefreshing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) {
      return `${secs} secs`;
    } else if (secs === 0) {
      return `${mins} mins`;
    } else {
      return `${mins} mins ${secs} secs`;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Animate refresh
    setTimeout(() => {
      loadQueueData();
      updateCurrentTime();
      
      // Show success message
      Swal.fire({
        title: 'Queue Updated!',
        text: 'Live queue has been refreshed.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      });
      
      setIsRefreshing(false);
    }, 800);
  };

  const handleGetNotification = () => {
    Swal.fire({
      title: 'Notification Set!',
      html: `You will be notified when it's your turn.<br><small>Approximately ${formatTime(estimatedWait)} remaining</small>`,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  };

  const handleNeedToLeave = () => {
    Swal.fire({
      title: 'Need to Leave?',
      text: 'Would you like to reschedule your appointment or remain in the queue?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reschedule',
      cancelButtonText: 'Stay in Queue',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove current appointment from localStorage
        localStorage.removeItem('currentPatientAppointment');
        
        // Update queue to remove current user
        const updatedQueue = queue.filter(p => !p.isCurrentUser);
        setQueue(updatedQueue);
        localStorage.setItem('liveQueueData', JSON.stringify(updatedQueue));
        
        Swal.fire({
          title: 'Appointment Rescheduled',
          text: 'Please select a new appointment time.',
          icon: 'info',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          navigate('/patients');
        });
      }
    });
  };



  const calculateProgress = () => {
    const completedCount = queue.filter(p => p.status === 'completed').length;
    return Math.min(100, Math.round((completedCount / Math.max(1, queue.length - 1)) * 100));
  };

  const calculateEstimatedConsultationTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + Math.floor(estimatedWait / 60));
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getCurrentStatus = () => {
    const currentUser = queue.find(p => p.isCurrentUser);
    if (!currentUser) return 'Not in queue';
    
    switch (currentUser.status) {
      case 'your-turn': return `Your turn in ${Math.max(0, currentUser.position - 2)} position${currentUser.position - 2 !== 1 ? 's' : ''}`;
      case 'waiting': return `${formatTime(estimatedWait)} remaining`;
      case 'in-session': return 'Currently in consultation';
      default: return 'Completed';
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Link 
                to="/patients" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span 
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    CF
                  </span>
                </div>
                <div>
                  <h1 
                    className="text-lg font-bold text-gray-900 leading-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    ClinicFlow <span className="text-blue-600">Live</span>
                  </h1>
                  <p 
                    className="text-xs text-gray-500"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Real-time queue updates
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div 
                className="text-xs text-gray-500 mb-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Last updated
              </div>
              <div 
                className="text-sm font-medium text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {time}
              </div>
            </div>
          </div>
          
          {/* Wait Time Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span 
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Estimated Wait Time
                  </span>
                </div>
                <div 
                  className="text-3xl font-bold text-blue-600"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {formatTime(estimatedWait)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
                  <span className="text-lg">🕐</span>
                </div>
              </div>
            </div>
            <div 
              className="text-xs text-gray-500 flex items-center gap-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {getCurrentStatus()}
            </div>
          </div>
        </div>

        {/* Queue List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-lg font-semibold text-gray-800"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Live Queue Status
            </h3>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Updating...' : 'Refresh'}
            </button>
          </div>
          
          <div className="space-y-3">
            {queue.map((patient) => (
              <div
                key={patient.id}
                className={`bg-white rounded-xl p-4 flex items-center gap-4 transition-all ${
                  patient.isCurrentUser 
                    ? 'border-2 border-blue-500 shadow-md' 
                    : 'border border-gray-200 hover:border-blue-200'
                } ${patient.status === 'completed' ? 'opacity-80' : ''}`}
              >
                {/* Status Indicator */}
                <div className="flex-shrink-0">
                  {patient.status === 'completed' ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  ) : patient.status === 'in-session' ? (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  ) : patient.status === 'your-turn' ? (
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`font-medium truncate ${patient.isCurrentUser ? 'text-blue-600' : 'text-gray-900'}`}
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {patient.name}
                      </span>
                      {patient.isCurrentUser && (
                        <span 
                          className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex-shrink-0">
                      {patient.appointmentTime && patient.status === 'completed' && patient.appointmentTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {patient.status === 'completed' && (
                        <span 
                          className="text-green-600 text-sm flex items-center gap-1"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          ✓ Completed
                        </span>
                      )}
                      {patient.status === 'in-session' && (
                        <span 
                          className="text-blue-600 text-sm flex items-center gap-1"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          👨‍⚕️ In Session
                        </span>
                      )}
                      {patient.status === 'your-turn' && (
                        <span 
                          className="text-amber-600 font-semibold text-sm flex items-center gap-1"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          <AlertCircle className="w-3 h-3" />
                          Your turn in {Math.max(0, patient.position - 2)} position{patient.position - 2 !== 1 ? 's' : ''}
                        </span>
                      )}
                      {patient.status === 'waiting' && (
                        <span 
                          className="text-gray-500 text-sm"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {patient.waitTime ? `Waiting ~${patient.waitTime} min` : 'Waiting'}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-gray-400">
                      #{patient.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Queue Progress
            </div>
            <div className="flex items-center justify-between mb-2">
              <div 
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {calculateProgress()}%
              </div>
              <div className="text-xs text-gray-500">
                {queue.filter(p => p.status === 'completed').length}/{queue.length} completed
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Avg. Wait Time
            </div>
            <div 
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              15 min
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="w-3 h-3" />
              {queue.filter(p => p.status === 'waiting').length} waiting
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 space-y-3">
          <button 
            onClick={handleGetNotification}
            className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Bell className="w-5 h-5" />
            Get Notification When Ready
          </button>
          <button 
            onClick={handleNeedToLeave}
            className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3.5 rounded-xl hover:bg-blue-50 transition-colors active:scale-[0.98]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Need to Leave?
          </button>
        </div>

        {/* Appointment Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 
                className="font-medium text-gray-900 mb-1"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Your Appointment
              </h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="font-medium">Estimated time:</span>{' '}
                  <span className="text-blue-600">{calculateEstimatedConsultationTime()}</span>
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="font-medium">Doctor:</span> {doctorName}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="font-medium">Location:</span> {clinicName}, 
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Tips */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-sm">💡</span>
            </div>
            <h4 
              className="font-medium text-blue-800"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Helpful Tips
            </h4>
          </div>
          <ul className="text-xs text-blue-700 space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                Check in at reception 10 minutes before your estimated time
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                Bring your ID and insurance information
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                Notify staff if your symptoms change while waiting
              </span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Queue updates automatically every 30 seconds
          </div>
          <button
            onClick={() => navigate('/patients')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ← Back to Doctors
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveQueue;
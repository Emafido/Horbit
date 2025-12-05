// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './assets/Components/Landing';
import Signin from './assets/Components/Signin';
import PatientsHome from './assets/Components/PatientsHome';
import DoctorHome from './assets/Components/DoctorsHome';
import LiveQueue from './assets/Components/LiveQueue';
import DoctorAvailability from './assets/Components/DoctorAvailability';
import './App.css';

// Loader Component using your CSS
const Loader = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="loader"></div>
    </div>
  );
};

// Main App Content
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      
      <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/signin" element={<Signin />} />
         <Route path="/patientshome" element={<PatientsHome />} />
         <Route path="/doctorshome" element={<DoctorHome />} />
         <Route path="/livequeue" element={<LiveQueue />} />
         <Route path="/doctoravailability" element={<DoctorAvailability />} />
        {/* 
          Add more routes here as you create them:
          Example:
         
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
        */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
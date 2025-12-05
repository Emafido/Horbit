// components/DoctorManageAvailabilityCompact.tsx
import React, { useState } from 'react';
import { Plus, Trash2, Clock, Users, Check, X } from 'lucide-react';

const DoctorAvailability: React.FC = () => {
  const [days, setDays] = useState([
    { name: 'Mon', open: true, slots: ['08:00 - 10:00', '10:15 - 11:00', '14:00 - 15:00'] },
    { name: 'Tue', open: true, slots: ['09:00 - 10:00', '10:15 - 11:00', '14:00 - 15:00'] },
    { name: 'Wed', open: true, slots: ['09:00 - 10:00', '10:15 - 11:00', '14:00 - 15:00'] },
    { name: 'Thu', open: true, slots: ['09:00 - 10:00', '10:15 - 11:00', '14:00 - 15:00'] },
    { name: 'Fri', open: true, slots: ['09:00 - 10:00', '10:15 - 11:00', '14:00 - 15:00'] },
    { name: 'Sat', open: true, slots: ['10:00 - 12:00'] },
    { name: 'Sun', open: false, slots: [] },
  ]);

  const [consultTime, setConsultTime] = useState(10);
  const [maxPatients, setMaxPatients] = useState(20);

  const toggleDay = (index: number) => {
    const newDays = [...days];
    newDays[index].open = !newDays[index].open;
    setDays(newDays);
  };

  const addSlot = (index: number) => {
    if (days[index].slots.length >= 5) return;
    const newDays = [...days];
    newDays[index].slots.push('09:00 - 10:00');
    setDays(newDays);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const newDays = [...days];
    newDays[dayIndex].slots.splice(slotIndex, 1);
    setDays(newDays);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">CF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Availability</h1>
              <p className="text-gray-600">Set your weekly schedule</p>
            </div>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
          {days.map((day, index) => (
            <div key={day.name} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-900">{day.name}</span>
                <button
                  onClick={() => toggleDay(index)}
                  className={`w-10 h-6 rounded-full transition-colors ${
                    day.open ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                    day.open ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              <div className="space-y-2">
                {day.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-700">{slot}</span>
                    <button
                      onClick={() => removeSlot(index, slotIndex)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {day.open && (
                  <button
                    onClick={() => addSlot(index)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium w-full justify-center p-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-400"
                  >
                    <Plus className="w-4 h-4" />
                    Add Slot
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-6">Clinic Settings</h3>
          
          <div className="space-y-6">
            {/* Consult Time */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-700">Default consult time</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xl font-bold text-gray-900">{consultTime} min</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={consultTime}
                onChange={(e) => setConsultTime(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>5 min</span>
                <span>30 min</span>
                <span>60 min</span>
              </div>
            </div>

            {/* Max Patients */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-700">Max patients/day</label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-xl font-bold text-gray-900">{maxPatients}</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={maxPatients}
                onChange={(e) => setMaxPatients(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>5</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors">
              Save Availability Settings
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-sm text-blue-600 mb-1">Open Days</div>
            <div className="text-2xl font-bold text-blue-700">
              {days.filter(d => d.open).length}/7
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-sm text-blue-600 mb-1">Total Slots</div>
            <div className="text-2xl font-bold text-blue-700">
              {days.reduce((sum, day) => sum + day.slots.length, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
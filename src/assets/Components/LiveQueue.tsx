// components/LiveQueueStatusCompact.tsx
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, User, AlertCircle, RefreshCw } from 'lucide-react';

const LiveQueue: React.FC = () => {
  const [time, setTime] = useState<string>('10:02 AM');
  const [estimatedWait, setEstimatedWait] = useState<number>(750); // seconds

  const queue = [
    { id: 1, name: 'Sarah J.', status: 'completed', icon: '✓' },
    { id: 2, name: 'David L.', status: 'in-session', icon: '👨‍⚕️' },
    { id: 3, name: 'Alex R.', status: 'your-turn', icon: '📍', isYou: true },
    { id: 4, name: 'Emily W.', status: 'waiting', icon: '⏳' },
    { id: 5, name: 'Chris B.', status: 'waiting', icon: '⏳' },
    { id: 6, name: 'Michael K.', status: 'waiting', icon: '⏳' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (estimatedWait > 0) {
        setEstimatedWait(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [estimatedWait]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} mins ${secs} secs`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CF</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                ClinicFlow <span className="text-blue-600">Live</span>
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Updated: {time}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Real-time updates for your visit</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Estimated Wait</p>
                <p className="text-2xl font-bold text-gray-900">{formatTime(estimatedWait)}</p>
              </div>
              <button className="p-2 bg-blue-50 rounded-lg">
                <RefreshCw className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Queue List */}
        <div className="space-y-3">
          {queue.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-4 flex items-center gap-4 ${
                item.isYou 
                  ? 'border-2 border-blue-500 shadow-md' 
                  : 'border border-gray-200'
              }`}
            >
              {/* Position Number */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === 'completed' ? 'bg-green-100' :
                item.status === 'in-session' ? 'bg-blue-100' :
                item.status === 'your-turn' ? 'bg-amber-100' :
                'bg-gray-100'
              }`}>
                <span className={`font-bold ${
                  item.status === 'completed' ? 'text-green-600' :
                  item.status === 'in-session' ? 'text-blue-600' :
                  item.status === 'your-turn' ? 'text-amber-600' :
                  'text-gray-500'
                }`}>
                  {index + 1}
                </span>
              </div>

              {/* Patient Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${item.isYou ? 'text-blue-600' : 'text-gray-900'}`}>
                      {item.name}
                    </span>
                    {item.isYou && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{item.icon}</span>
                </div>
                
                <div className="mt-1">
                  {item.status === 'completed' && (
                    <span className="text-green-600 text-sm">✓ Completed</span>
                  )}
                  {item.status === 'in-session' && (
                    <span className="text-blue-600 text-sm">In Session</span>
                  )}
                  {item.status === 'your-turn' && (
                    <span className="text-amber-600 font-semibold text-sm">
                      Your turn in 2 positions
                    </span>
                  )}
                  {item.status === 'waiting' && (
                    <span className="text-gray-500 text-sm">Waiting</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 bg-white rounded-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Queue Progress</span>
            <span>2/6 completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" 
              style={{ width: '33%' }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Get Notification
          </button>
          <button className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors">
            Need to Leave?
          </button>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your estimated consultation time: 10:15 AM</p>
          <p className="mt-1">Dr. Smith's Clinic • Room 205</p>
        </div>
      </div>
    </div>
  );
};

export default LiveQueue;
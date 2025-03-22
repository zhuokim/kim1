import React, { useState } from 'react';
import { Score } from '../types';

interface AdminPanelProps {
  scores: Score[];
  onClearScores: () => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ scores, onClearScores, onLogout }) => {
  const [selectedGroup, setSelectedGroup] = useState<number | 'all'>('all');
  
  // Filter scores by group
  const filteredScores = selectedGroup === 'all' 
    ? scores 
    : scores.filter(score => score.group === selectedGroup);

  // Calculate average time by group
  const groupAverages = scores.reduce((acc, score) => {
    if (!acc[score.group]) {
      acc[score.group] = { total: 0, count: 0 };
    }
    acc[score.group].total += score.time;
    acc[score.group].count += 1;
    return acc;
  }, {} as Record<number, { total: number; count: number; }>);

  const handleClearScores = () => {
    if (window.confirm('Are you sure you want to clear all scores? This action cannot be undone.')) {
      onClearScores();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Total Completions</div>
                <div className="text-2xl font-bold text-blue-600">{scores.length}</div>
              </div>
              {Object.entries(groupAverages).map(([group, data]) => (
                <div key={group} className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Group {group} Average Time</div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(data.total / data.count)} sec
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Score Records</h2>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="all">All Groups</option>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map(group => (
                    <option key={group} value={group}>Group {group}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleClearScores}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                  transition-colors duration-200"
              >
                Clear Records
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Rank</th>
                    <th className="px-4 py-2 text-left">Group</th>
                    <th className="px-4 py-2 text-left">Time</th>
                    <th className="px-4 py-2 text-left">Completion Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScores.map((score, index) => (
                    <tr 
                      key={`${score.group}-${score.date}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-4 py-2">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `${index + 1}`}
                      </td>
                      <td className="px-4 py-2">Group {score.group}</td>
                      <td className="px-4 py-2">{score.time} sec</td>
                      <td className="px-4 py-2">{new Date(score.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 
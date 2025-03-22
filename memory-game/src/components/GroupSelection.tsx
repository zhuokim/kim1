import React from 'react';

interface GroupSelectionProps {
  onSelect: (group: number) => void;
}

const GroupSelection: React.FC<GroupSelectionProps> = ({ onSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Select Your Group</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((group) => (
          <button
            key={group}
            onClick={() => onSelect(group)}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span className="text-xl font-semibold text-blue-600">Group {group}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupSelection; 
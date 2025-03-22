import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import GroupSelection from './components/GroupSelection';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { Score } from './types';

const ADMIN_PASSWORD = '337878'; // Admin password
const SCORES_STORAGE_KEY = 'gameScores';

const App: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);

  // Load scores from localStorage
  const loadScores = () => {
    try {
      const savedScores = localStorage.getItem(SCORES_STORAGE_KEY);
      if (savedScores) {
        const parsedScores = JSON.parse(savedScores);
        if (Array.isArray(parsedScores)) {
          setScores(parsedScores);
        } else {
          console.error('Invalid scores data format');
          setScores([]);
        }
      }
    } catch (error) {
      console.error('Error loading scores:', error);
      setScores([]);
    }
  };

  // Save scores to localStorage
  const saveScores = (updatedScores: Score[]) => {
    try {
      localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(updatedScores));
      setScores(updatedScores);
    } catch (error) {
      console.error('Error saving scores:', error);
    }
  };

  useEffect(() => {
    loadScores();
  }, []);

  const handleGroupSelect = (group: number) => {
    setSelectedGroup(group);
  };

  const handleGameComplete = (time: number) => {
    if (!selectedGroup) return;
    
    try {
      const newScore: Score = {
        group: selectedGroup,
        time,
        date: new Date().toISOString()
      };
      
      const updatedScores = [...scores, newScore];
      saveScores(updatedScores);
      setSelectedGroup(null);
    } catch (error) {
      console.error('Error handling game completion:', error);
    }
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      loadScores();
    }
  };

  const handleClearScores = () => {
    try {
      localStorage.removeItem(SCORES_STORAGE_KEY);
      setScores([]);
    } catch (error) {
      console.error('Error clearing scores:', error);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  if (isAdmin) {
    return (
      <AdminPanel
        scores={scores}
        onClearScores={handleClearScores}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onCancel={() => setShowAdminLogin(false)}
        />
      )}
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Memory Card Game</h1>
          <button
            onClick={() => setShowAdminLogin(true)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Admin
          </button>
        </div>

        {!selectedGroup ? (
          <GroupSelection onSelect={handleGroupSelect} />
        ) : (
          <Game
            group={selectedGroup}
            onComplete={handleGameComplete}
          />
        )}
      </div>
    </div>
  );
};

export default App; 
import React from 'react';
import { Score } from '../types';

interface LeaderboardProps {
  scores: Score[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  // 按时间排序
  const sortedScores = [...scores].sort((a, b) => a.time - b.time);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">排行榜</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">排名</th>
              <th className="px-4 py-2 text-left">组别</th>
              <th className="px-4 py-2 text-left">用时</th>
              <th className="px-4 py-2 text-left">完成时间</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((score, index) => (
              <tr 
                key={`${score.group}-${score.date}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </td>
                <td className="px-4 py-2">第 {score.group} 组</td>
                <td className="px-4 py-2">{score.time} 秒</td>
                <td className="px-4 py-2">{new Date(score.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard; 
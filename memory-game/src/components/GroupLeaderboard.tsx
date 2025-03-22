import React from 'react';
import { Score } from '../types';

interface GroupLeaderboardProps {
  group: number;
  scores: Score[];
}

const GroupLeaderboard: React.FC<GroupLeaderboardProps> = ({ group, scores }) => {
  // 只过滤出当前组的成绩并按时间排序
  const groupScores = scores
    .filter(score => score.group === group)
    .sort((a, b) => a.time - b.time);

  if (groupScores.length === 0) {
    return (
      <div className="mt-4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-600 mb-4">本组排行榜</h2>
        <p className="text-gray-500">暂无完成记录</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-blue-600 mb-4">本组排行榜</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">排名</th>
              <th className="px-4 py-2 text-left">用时</th>
              <th className="px-4 py-2 text-left">完成时间</th>
            </tr>
          </thead>
          <tbody>
            {groupScores.map((score, index) => (
              <tr 
                key={score.date}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `${index + 1}`}
                </td>
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

export default GroupLeaderboard; 
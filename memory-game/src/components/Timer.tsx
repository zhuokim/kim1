import React, { useEffect, useState } from 'react';

interface TimerProps {
  startTime: number | null;
  endTime: number | null;
}

const Timer: React.FC<TimerProps> = ({ startTime, endTime }) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (startTime && !endTime) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else if (endTime) {
      setTime(Math.floor((endTime - startTime!) / 1000));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startTime, endTime]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-bold text-gray-800">
      {formatTime(time)}
    </div>
  );
};

export default Timer; 
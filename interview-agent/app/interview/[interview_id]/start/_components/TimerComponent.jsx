'use client';

import React, { useEffect, useState } from 'react';

export default function TimerComponent({ durationInMinutes = 15, onTimerEnd }) {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);

  // Format time to HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimerEnd) onTimerEnd(); // trigger callback
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="text-lg font-mono font-semibold">
      ⏱️ {formatTime(timeLeft)}
    </div>
  );
}

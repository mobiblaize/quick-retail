import { useState, useEffect, useRef } from "react";

export function useCountdown(durationSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isActive]);

  // Restart timer
  const restart = () => {
    setSecondsLeft(durationSeconds);
    setIsActive(true);
  };

  return { secondsLeft, isActive, restart };
}

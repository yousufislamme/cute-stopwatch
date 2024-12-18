"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0); // Time in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null); // Store the time when the stopwatch started
  const intervalRef = useRef<number | null>(null); // Store the interval ID

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time * 10; // Adjust for the current elapsed time
      intervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - (startTimeRef.current ?? 0)) / 10,
        ); // Calculate elapsed centiseconds
        setTime(elapsed);
      }, 10); // Update every 10ms
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0);
    startTimeRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const centiseconds = `0${time % 100}`.slice(-2); // Last two digits for centiseconds
    const totalSeconds = Math.floor(time / 100);
    const seconds = `0${totalSeconds % 60}`.slice(-2); // Modulo 60 for seconds
    const minutes = `0${Math.floor(totalSeconds / 60)}`.slice(-2); // Minutes

    return (
      <div className="flex justify-center transition-all duration-75 ease-out">
        <span className="w-[85px] sm:w-[200px] md:w-[250px] lg:w-[350px]">
          {minutes}
        </span>
        :
        <span className="w-[85px] sm:w-[200px] md:w-[250px] lg:w-[350px]">
          {seconds}
        </span>
        :
        <span className="w-[85px] sm:w-[200px] md:w-[250px] lg:w-[350px]">
          {centiseconds}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="sx:text-[5rem] py-[2rem] text-center text-[3rem] font-extrabold text-white sm:text-[7rem] md:text-[10rem] lg:text-[14rem]">
        {formatTime(time)}
      </div>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row md:gap-5">
        {!isRunning ? (
          <Button
            btnName="Start"
            className="bg-pink-400 px-2 py-1 text-white hover:bg-[#5b4266] md:px-4 md:py-2"
            onClick={startTimer}
          />
        ) : (
          <Button
            onClick={stopTimer}
            btnName="Pause"
            className="bg-pink-400 px-2 py-1 text-white hover:bg-[#5b4266] md:px-4 md:py-2"
          />
        )}

        <Button
          onClick={resetTimer}
          btnName="Reset"
          className="bg-[#5b4266] px-2 py-1 text-white hover:bg-slate-50 hover:text-[#5b4266] md:px-4 md:py-2"
        />
      </div>
    </div>
  );
};

export default Stopwatch;

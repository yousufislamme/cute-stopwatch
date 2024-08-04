"use client";
import Stopwatch from "@/components/Stopwatch";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

const Home: React.FC = () => {
  const [title, setTitle] = useState<string>("Stopwatch");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsEditing(false);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <main className="bg-[#2C1338] py-10">
      <div className="flex w-full justify-center">
        {/* Title */}
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            autoFocus
            className="mt-2 border-none bg-transparent text-center text-3xl font-semibold text-slate-50 outline-none"
          />
        ) : (
          <h1
            className="mt-2 cursor-pointer text-3xl font-semibold text-slate-50"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </h1>
        )}
      </div>
      <div>
        <Stopwatch />
      </div>
    </main>
  );
};

export default Home;

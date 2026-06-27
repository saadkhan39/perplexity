import React from 'react'

const ThinkingLoader = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-[#8ce3ff]" />
      <div
        className="h-2 w-2 animate-bounce rounded-full bg-[#8ce3ff]"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="h-2 w-2 animate-bounce rounded-full bg-[#8ce3ff]"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  );
};

export default ThinkingLoader
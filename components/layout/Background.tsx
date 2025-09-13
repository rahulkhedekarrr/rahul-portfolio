"use client";

const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none paint-optimized">
      <div className="absolute -inset-10 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl gpu-accelerated blob-anim-20" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-2xl gpu-accelerated blob-anim-25" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl gpu-accelerated blob-anim-30" />
      </div>
    </div>
  );
};

export default Background;

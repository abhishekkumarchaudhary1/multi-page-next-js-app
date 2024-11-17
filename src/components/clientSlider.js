'use client'

import { useRef, useEffect, useState } from "react";

export default function CliientSlider() {
  const scrollContainerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("left"); // Initial scroll direction
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [isDragging, setIsDragging] = useState(false); // Dragging state
  const [startX, setStartX] = useState(null); // Start X position for drag/swipe
  const [scrollLeft, setScrollLeft] = useState(0); // Initial scrollLeft value

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollDirection === "left" && scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0; // Reset for left scroll
      } else if (scrollDirection === "right" && scrollContainer.scrollLeft <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2; // Reset for right scroll
      }
    };

    let scrollInterval;
    const startScrolling = () => {
      if (!isPaused && !isDragging) {
        scrollInterval = setInterval(() => {
          if (scrollContainer) {
            scrollContainer.scrollLeft += scrollDirection === "left" ? 1 : -1; // Adjust speed
            handleScroll();
          }
        }, 20);
      }
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, [scrollDirection, isPaused, isDragging]);

  const handleMouseDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for sensitivity
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for sensitivity
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const divs = [
    { color: "bg-red-500", label: "Div 1" },
    { color: "bg-blue-500", label: "Div 2" },
    { color: "bg-green-500", label: "Div 3" },
    { color: "bg-yellow-500", label: "Div 4" },
    { color: "bg-purple-500", label: "Div 5" },
    { color: "bg-pink-500", label: "Div 6" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Interactive Slider with Drag & Swipe</h1>

      {/* Controls */}
      <div className="flex justify-between items-center w-full max-w-5xl mb-4">
        <button
          onClick={() => setScrollDirection("left")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ◀ Move Left
        </button>
        <button
          onClick={() => setScrollDirection("right")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ▶ Move Right
        </button>
      </div>

      {/* Scrolling Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden whitespace-nowrap border rounded-lg px-4 space-x-4 w-full max-w-5xl"
        style={{
          cursor: isDragging ? "grabbing" : "grab", // Visual feedback for dragging
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Resume scrolling if mouse leaves
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex space-x-4">
          {divs.map((div, index) => (
            <div
              key={`original-${index}`}
              className={`w-64 h-64 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl ${div.color}`}
            >
              {div.label}
            </div>
          ))}
          {divs.map((div, index) => (
            <div
              key={`duplicate-${index}`}
              className={`w-64 h-64 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl ${div.color}`}
            >
              {div.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

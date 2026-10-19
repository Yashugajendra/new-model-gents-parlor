"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on non-touch devices with fine cursor
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouchDevice(false);
    } else {
      return;
    }

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select") ||
        target.closest("[role='button']") ||
        target.closest(".luxury-card") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", checkHoverable);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth lerp trailing loop for outer ring
    const render = () => {
      // Lerp factor (0.15 for smooth luxury glide)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkHoverable);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-gradient-to-tr from-[#c5a880] to-[#f3ebdd] shadow-[0_0_10px_#c5a880] pointer-events-none will-change-transform"
      />

      {/* Trailing Fluid Luxury Ring */}
      <div
        ref={ringRef}
        style={{
          width: isHovered ? "64px" : "36px",
          height: isHovered ? "64px" : "36px",
          marginLeft: isHovered ? "-32px" : "-18px",
          marginTop: isHovered ? "-32px" : "-18px",
        }}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none will-change-transform transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? "border-[#c5a880] bg-[#c5a880]/15 scale-110 shadow-[0_0_25px_rgba(197,168,128,0.35)] backdrop-blur-[1px]"
            : "border-[#c5a880]/40 bg-transparent shadow-[0_0_12px_rgba(197,168,128,0.15)]"
        } ${isClicked ? "scale-90 opacity-80" : ""}`}
      >
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping opacity-75" />
        )}
      </div>
    </div>
  );
}

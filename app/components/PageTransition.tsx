"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export function usePageTransition() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);

  const navigateWithSpin = (href: string) => {
    setIsSpinning(true);
    setTimeout(() => {
      router.push(href);
    }, 400); // Navigate halfway through the spin
  };

  return { isSpinning, setIsSpinning, navigateWithSpin };
}

export default function PageTransition({ children }: PageTransitionProps) {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isEntering ? "rotate-y-90 opacity-0" : "rotate-y-0 opacity-100"
      }`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </div>
  );
}

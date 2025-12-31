"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/New_RMA.png"
                alt="Rwanda Military Academy Logo"
                width={50}
                height={50}
                className="w-12 h-12 object-contain"
              />
              <span className="text-white font-bold text-xl">Rwanda Military Medical</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-golden-yellow"
                    : "text-white hover:text-golden-yellow"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/about"
                    ? "text-golden-yellow"
                    : "text-white hover:text-golden-yellow"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors ${
                  pathname === "/contact"
                    ? "text-golden-yellow"
                    : "text-white hover:text-golden-yellow"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons - Right */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="flex items-center gap-2 border-2 border-golden-yellow text-white px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-golden-yellow hover:text-army-green-dark hover:scale-105 active:scale-95"
            >
              <i className="bi bi-box-arrow-in-right"></i>
              Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 bg-golden-yellow text-army-green-dark border-2 border-golden-yellow px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 shadow-md hover:bg-transparent hover:text-white hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <i className="bi bi-person-plus"></i>
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-golden-yellow focus:outline-none text-2xl"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <i className="bi bi-x-lg"></i>
              ) : (
                <i className="bi bi-list"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-2 bg-army-green-dark/95 backdrop-blur-md">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === "/"
                  ? "text-golden-yellow"
                  : "text-white hover:text-golden-yellow"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === "/about"
                  ? "text-golden-yellow"
                  : "text-white hover:text-golden-yellow"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 text-base font-medium ${
                pathname === "/contact"
                  ? "text-golden-yellow"
                  : "text-white hover:text-golden-yellow"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 border-2 border-golden-yellow text-white px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-golden-yellow hover:text-army-green-dark active:scale-95"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              Login
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center gap-2 bg-golden-yellow text-army-green-dark border-2 border-golden-yellow px-3 py-2 rounded-md text-base font-semibold transition-all duration-300 hover:bg-transparent hover:text-white hover:shadow-lg active:scale-95"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="bi bi-person-plus"></i>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

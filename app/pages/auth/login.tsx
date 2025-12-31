"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrId: "",
    password: "",
    isStaff: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  const navigateWithSpin = (href: string) => {
    setIsSpinning(true);
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  return (
    <div
      className={`page-transition-wrapper ${isSpinning ? "spin-out" : ""} ${isEntering ? "spin-in" : ""}`}
    >
      <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white min-h-screen lg:min-h-0">
          {/* Mobile Header - Fixed at top */}
          <div className="lg:hidden sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 safe-area-top">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="text-golden-yellow hover:text-golden-yellow-dark transition-colors p-1 -ml-1"
              >
                <i className="bi bi-chevron-left text-2xl font-bold"></i>
              </button>
              <Image
                src="/New_RMA.png"
                alt="Rwanda Military Academy Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="text-army-green-dark font-bold text-sm">
                Rwanda Military Medical
              </span>
            </div>
          </div>

          {/* Form Container */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-4 py-8 lg:py-0">
          <div className="w-full max-w-xs">
            {/* Back Button and Logo - Desktop Only */}
            <div className="hidden lg:flex items-center gap-2 mb-5">
              <button
                onClick={() => router.back()}
                className="text-golden-yellow hover:text-golden-yellow-dark transition-colors"
              >
                <i className="bi bi-chevron-left text-2xl font-bold"></i>
              </button>
              <Image
                src="/New_RMA.png"
                alt="Rwanda Military Academy Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="text-army-green-dark font-bold text-base">
                Rwanda Military Medical
              </span>
            </div>

            {/* Login Header */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-army-green-dark underline underline-offset-6 decoration-2 decoration-golden-yellow mb-1">
                Login
              </h1>
              <p className="text-gray-600 text-xs">
                Welcome! Please enter your details.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email  */}
              <div>
                <label
                  htmlFor="emailOrId"
                  className="block text-xs font-medium text-army-green-dark mb-1"
                >
                  Enter your Email
                </label>
                <input
                  type="text"
                  id="emailOrId"
                  name="emailOrId"
                  value={formData.emailOrId}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                  placeholder="moisecaicedo@gmail.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-army-green-dark mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 pr-9 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                    placeholder="**************"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-golden-yellow hover:text-golden-yellow-dark transition-colors"
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-sm`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div>
                <button
                  type="button"
                  onClick={() => navigateWithSpin("/all/auth/forgot-password")}
                  className="text-xs text-golden-yellow font-medium hover:text-golden-yellow-dark transition-colors"
                >
                  Forgot password
                </button>
              </div>

              {/* I am instructor Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isStaff"
                  name="isStaff"
                  checked={formData.isStaff}
                  onChange={handleInputChange}
                  className="w-3.5 h-3.5 rounded border-golden-yellow text-golden-yellow focus:ring-golden-yellow accent-golden-yellow cursor-pointer"
                />
                <label
                  htmlFor="isStaff"
                  className="ml-2 text-xs text-army-green-dark font-medium cursor-pointer"
                >
                  I am instructor
                </label>
              </div>

              {/* Sign In Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-auto mx-auto block bg-golden-yellow text-army-green-dark font-semibold py-2 px-8 rounded text-xs transition-all duration-300 hover:bg-golden-yellow-dark hover:shadow-lg active:scale-[0.98]"
                >
                  LOGIN
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-xs pt-1">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigateWithSpin("/all/auth/signup")}
                  className="text-golden-yellow font-medium hover:text-golden-yellow-dark transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </form>

            {/* Divider */}
            <div className="mt-4">
              <div className="h-1 bg-golden-yellow rounded-full"></div>
            </div>
          </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative">
          <Image
            src="/New_RMA.png"
            alt="Rwanda Military Academy Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

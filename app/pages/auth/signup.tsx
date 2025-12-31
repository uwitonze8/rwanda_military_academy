"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const navigateWithSpin = (href: string) => {
    setIsSpinning(true);
    setTimeout(() => {
      router.push(href);
    }, 400);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    console.log("Signup attempt:", formData);
  };

  return (
    <div
      className={`page-transition-wrapper ${isSpinning ? "spin-out" : ""} ${isEntering ? "spin-in" : ""}`}
    >
      <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row-reverse overflow-hidden">
      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white overflow-y-auto">
        {/* Sticky Header with Back Button and Logo */}
        <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 safe-area-top">
          <div className="max-w-xs mx-auto flex items-center gap-2">
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
            <span className="text-army-green-dark font-bold text-sm sm:text-base">
              RMA Medical
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-4 py-6">
          <div className="w-full max-w-xs">
            {/* Signup Header */}
            <div className="text-center mb-3">
            <h1 className="text-2xl font-bold text-army-green-dark underline underline-offset-6 decoration-2 decoration-golden-yellow mb-1">
              Sign Up
            </h1>
            <p className="text-gray-600 text-xs">
              Create your account to get started.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {/* Name Fields - Row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs font-medium text-army-green-dark mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                  placeholder="Moise"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs font-medium text-army-green-dark mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                  placeholder="Caicedo"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-army-green-dark mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                placeholder="moisecaicedo@gmail.com"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-army-green-dark mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                placeholder="+250 788 123 456"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-xs font-medium text-army-green-dark mb-1"
              >
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs cursor-pointer"
                required
              >
                <option value="patient">Patient</option>
                <option value="instructor">Instructor</option>
              </select>
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

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-army-green-dark mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 pr-9 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                  placeholder="**************"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-golden-yellow hover:text-golden-yellow-dark transition-colors"
                >
                  <i
                    className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} text-sm`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-2">
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <i className="bi bi-exclamation-circle"></i>
                  {error}
                </p>
              </div>
            )}

            {/* Password Requirements */}
            <div className="text-xs text-gray-500">
              <p className="font-medium text-army-green-dark mb-1">
                Password must:
              </p>
              <ul className="space-y-0.5 pl-3">
                <li
                  className={
                    formData.password.length >= 8
                      ? "text-army-green"
                      : "text-gray-400"
                  }
                >
                  <i
                    className={`bi ${formData.password.length >= 8 ? "bi-check-circle-fill" : "bi-circle"} mr-1`}
                  ></i>
                  Be at least 8 characters
                </li>
                <li
                  className={
                    formData.password === formData.confirmPassword &&
                    formData.confirmPassword
                      ? "text-army-green"
                      : "text-gray-400"
                  }
                >
                  <i
                    className={`bi ${formData.password === formData.confirmPassword && formData.confirmPassword ? "bi-check-circle-fill" : "bi-circle"} mr-1`}
                  ></i>
                  Match confirmation
                </li>
              </ul>
            </div>

            {/* Sign Up Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-auto mx-auto block bg-golden-yellow text-army-green-dark font-semibold py-2 px-8 rounded text-xs transition-all duration-300 hover:bg-golden-yellow-dark hover:shadow-lg active:scale-[0.98]"
              >
                Sign Up
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-xs pt-1">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigateWithSpin("/all/auth/login")}
                className="text-golden-yellow font-medium hover:text-golden-yellow-dark transition-colors"
              >
                Login
              </button>
            </p>
          </form>

          {/* Divider */}
          <div className="mt-3">
            <div className="h-1 bg-golden-yellow rounded-full"></div>
          </div>
          </div>
        </div>
      </div>

      {/* Left Side - Image */}
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

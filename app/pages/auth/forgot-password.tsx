"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP sent to:", email);
    setStep("otp");
    setResendTimer(60);
    setError("");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or next empty one
    const focusIndex = Math.min(pastedData.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    // Simulate OTP verification
    console.log("Verifying OTP:", otpValue);
    setStep("reset");
    setError("");
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    console.log("Resending OTP to:", email);
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(60);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    console.log("Password reset successful");
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white min-h-screen lg:min-h-0">
        {/* Mobile Header - Fixed at top */}
        <div className="lg:hidden sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 safe-area-top">
          <div className="flex items-center gap-2">
            <Link
              href="/all/auth/login"
              className="text-golden-yellow hover:text-golden-yellow-dark transition-colors p-1 -ml-1"
            >
              <i className="bi bi-chevron-left text-2xl font-bold"></i>
            </Link>
            <Image
              src="/New_RMA.png"
              alt="Rwanda Military Academy Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
            />
            <span className="text-army-green-dark font-bold text-sm">
              RMA Medical
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-4 py-8 lg:py-0">
        <div className="w-full max-w-xs">
          {/* Logo and Brand - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center gap-2 mb-5">
            <Image
              src="/New_RMA.png"
              alt="Rwanda Military Academy Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-army-green-dark font-bold text-base">
              RMA Medical
            </span>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <>
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-army-green-dark underline underline-offset-6 decoration-2 decoration-golden-yellow mb-1">
                  Password Reset
                </h1>
                <p className="text-gray-600 text-xs">
                  Your password has been reset successfully.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-army-green/10 border border-army-green/30 rounded p-4 text-center">
                  <i className="bi bi-check-circle text-3xl text-army-green mb-2"></i>
                  <p className="text-army-green-dark text-xs font-medium">
                    Your password has been reset successfully!
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    You can now log in with your new password.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/all/auth/login"
                    className="w-auto mx-auto flex items-center justify-center gap-2 bg-golden-yellow text-army-green-dark font-semibold py-2 px-8 rounded text-xs transition-all duration-300 hover:bg-golden-yellow-dark hover:shadow-lg active:scale-[0.98]"
                  >
                    <i className="bi bi-box-arrow-in-right"></i>
                    Go to Login
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Step 1: Email */}
              {step === "email" && (
                <>
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-army-green-dark underline underline-offset-6 decoration-2 decoration-golden-yellow mb-1">
                      Forgot Password
                    </h1>
                    <p className="text-gray-600 text-xs">
                      Enter your email to receive a verification code.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                        placeholder="moisecaicedo@gmail.com"
                        required
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-auto mx-auto block bg-golden-yellow text-army-green-dark font-semibold py-2 px-8 rounded text-xs transition-all duration-300 hover:bg-golden-yellow-dark hover:shadow-lg active:scale-[0.98]"
                      >
                        Send OTP
                      </button>
                    </div>

                    <p className="text-center text-gray-600 text-xs pt-1">
                      Remember your password?{" "}
                      <Link
                        href="/all/auth/login"
                        className="text-golden-yellow font-medium hover:text-golden-yellow-dark transition-colors"
                      >
                        Back to Login
                      </Link>
                    </p>
                  </form>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {step === "otp" && (
                <>
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-army-green-dark underline underline-offset-6 decoration-2 decoration-golden-yellow mb-1">
                      Verify OTP
                    </h1>
                    <p className="text-gray-600 text-xs">
                      Enter the 6-digit code sent to
                    </p>
                    <p className="text-army-green font-semibold text-xs">
                      {email}
                    </p>
                  </div>

                  <form onSubmit={handleOtpSubmit} className="space-y-3">
                    {/* OTP Input */}
                    <div className="flex justify-center gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          className="w-10 h-12 text-center text-lg font-bold bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-army-green-dark"
                        />
                      ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <p className="text-red-600 text-xs flex items-center justify-center gap-1">
                          <i className="bi bi-exclamation-circle"></i>
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Resend OTP */}
                    <div className="text-center">
                      {resendTimer > 0 ? (
                        <p className="text-gray-500 text-xs">
                          Resend OTP in{" "}
                          <span className="text-golden-yellow font-semibold">
                            {resendTimer}s
                          </span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-golden-yellow text-xs font-medium hover:text-golden-yellow-dark transition-colors"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-auto mx-auto block bg-golden-yellow text-army-green-dark font-semibold py-2 px-8 rounded text-xs transition-all duration-300 hover:bg-golden-yellow-dark hover:shadow-lg active:scale-[0.98]"
                      >
                        Verify OTP
                      </button>
                    </div>

                    <p className="text-center text-gray-600 text-xs pt-1">
                      <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="text-golden-yellow font-medium hover:text-golden-yellow-dark transition-colors"
                      >
                        Change Email
                      </button>
                    </p>
                  </form>
                </>
              )}

              {/* Step 3: Reset Password */}
              {step === "reset" && (
                <>
                  <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-army-green-dark underline underline-offset-6 decoration-2 decoration-golden-yellow mb-1">
                      Reset Password
                    </h1>
                    <p className="text-gray-600 text-xs">
                      Enter your new password below.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-3">
                    {/* New Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-xs font-medium text-army-green-dark mb-1"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handlePasswordChange}
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
                          onChange={handlePasswordChange}
                          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 pr-9 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:border-golden-yellow transition-all text-xs"
                          placeholder="**************"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
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

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-auto mx-auto block bg-golden-yellow text-army-green-dark font-semibold py-2 px-8 rounded text-xs transition-all duration-300 hover:bg-golden-yellow-dark hover:shadow-lg active:scale-[0.98]"
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}

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
  );
}

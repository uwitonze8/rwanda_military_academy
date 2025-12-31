"use client";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/Footer";

const whoWeServe = [
  { icon: "bi-mortarboard", title: "Officer Cadets", delay: "animation-delay-100" },
  { icon: "bi-person-workspace", title: "Instructors", delay: "animation-delay-200" },
  { icon: "bi-shield", title: "Battalion Members", delay: "animation-delay-300" },
  { icon: "bi-people", title: "Civilian Workers", delay: "animation-delay-400" },
];

const benefits = [
  { icon: "bi-calendar-check", title: "Easy Booking", description: "Book appointments anytime, anywhere", delay: "animation-delay-100" },
  { icon: "bi-clock-history", title: "Reduced Wait Times", description: "Better patient flow management", delay: "animation-delay-200" },
  { icon: "bi-bell", title: "Doctor Reminders", description: "Automated appointment notifications", delay: "animation-delay-300" },
  { icon: "bi-clipboard2-pulse", title: "Treatment Planning", description: "Streamlined diagnostics tracking", delay: "animation-delay-400" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 md:pt-40 md:pb-28 relative bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/27/f4/5d/27f45db4a3041d1d9b60b58f9f8b7b7e.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-army-green-dark/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            RMA Medical<span className="text-golden-yellow">.</span>
          </h1>
          <p className="text-golden-yellow text-lg md:text-xl font-medium mb-4">
            Appointment System
          </p>
          <p className="text-white/90 max-w-2xl mx-auto">
            A digital healthcare platform for the Rwanda Military Academy - enabling easy appointment booking for quality healthcare.
          </p>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-10 md:py-14 bg-white overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-16">
            Who We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-10 md:gap-4 pt-6 overflow-visible max-w-3xl mx-auto">
            {whoWeServe.map((item, index) => (
              <div key={index} className={`relative flex flex-col items-center text-center pt-6 md:pt-8 pb-3 md:pb-4 px-2 md:px-3 rounded-lg bg-gray-50 hover:bg-golden-yellow/10 card-hover animate-fade-in-up ${item.delay}`}>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 md:w-11 md:h-11 bg-army-green-dark rotate-45 flex items-center justify-center shadow-lg rhombus-icon">
                  <i className={`bi ${item.icon} text-golden-yellow text-sm md:text-base -rotate-45`}></i>
                </div>
                <h3 className="font-semibold text-black text-[10px] md:text-xs mt-1">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 md:py-14 bg-gray-50 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-16">
            How We Help
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-4 pt-4 overflow-visible max-w-3xl mx-auto">
            {benefits.map((item, index) => (
              <div key={index} className={`relative flex flex-col items-center text-center pt-6 md:pt-8 pb-3 md:pb-4 px-2 md:px-3 rounded-lg bg-white border border-gray-200 card-hover animate-fade-in-up ${item.delay}`}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-army-green-dark rotate-45 flex items-center justify-center shadow-lg rhombus-icon">
                  <i className={`bi ${item.icon} text-golden-yellow text-xs md:text-sm -rotate-45`}></i>
                </div>
                <h3 className="font-semibold text-black text-[10px] md:text-xs mb-0.5 mt-1">{item.title}</h3>
                <p className="text-black/70 text-[9px] md:text-[10px]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Medical Staff */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-10">
            For Medical Staff
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* For Nurses */}
            <div className="group bg-army-green-dark rounded-2xl p-6 md:p-8 text-white card-hover animate-fade-in-up animation-delay-100 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-golden-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-golden-yellow/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 bg-golden-yellow rotate-45 flex items-center justify-center shadow-lg rhombus-icon">
                    <i className="bi bi-heart-pulse text-army-green-dark text-lg -rotate-45"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white">For Nurses</h3>
                </div>
                <p className="text-white/80 text-sm mb-5 leading-relaxed">
                  Reduce daily patient queues with organized scheduling.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-golden-yellow/20 rounded-full flex items-center justify-center group-hover/item:bg-golden-yellow/30 transition-colors">
                      <i className="bi bi-check text-golden-yellow text-xs"></i>
                    </div>
                    <span className="text-white/90">Patient queue management</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-golden-yellow/20 rounded-full flex items-center justify-center group-hover/item:bg-golden-yellow/30 transition-colors">
                      <i className="bi bi-check text-golden-yellow text-xs"></i>
                    </div>
                    <span className="text-white/90">Better workload distribution</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Doctors */}
            <div className="group bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 card-hover animate-fade-in-up animation-delay-200 relative overflow-hidden hover:border-golden-yellow/30 transition-colors">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-army-green-dark/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-golden-yellow/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 bg-army-green-dark rotate-45 flex items-center justify-center shadow-lg rhombus-icon">
                    <i className="bi bi-clipboard2-pulse text-golden-yellow text-lg -rotate-45"></i>
                  </div>
                  <h3 className="text-xl font-bold text-black">For Doctors</h3>
                </div>
                <p className="text-black/70 text-sm mb-5 leading-relaxed">
                  Stay organized with reminders and easy access to patient data.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-army-green-dark/10 rounded-full flex items-center justify-center group-hover/item:bg-army-green-dark/20 transition-colors">
                      <i className="bi bi-check text-army-green-dark text-xs"></i>
                    </div>
                    <span className="text-black">Appointment reminders</span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 bg-army-green-dark/10 rounded-full flex items-center justify-center group-hover/item:bg-army-green-dark/20 transition-colors">
                      <i className="bi bi-check text-army-green-dark text-xs"></i>
                    </div>
                    <span className="text-black">Easy diagnostics access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

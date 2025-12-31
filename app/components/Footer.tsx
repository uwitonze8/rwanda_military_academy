"use client";

export default function Footer() {
  return (
    <footer className="bg-army-green-dark py-4 border-t border-army-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-golden-yellow text-sm">
          &copy; {new Date().getFullYear()} RMA Medical
        </p>
      </div>
    </footer>
  );
}

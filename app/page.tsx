import Navbar from "./components/navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-army-green-dark">
      <Navbar />

      {/* Main Content - placeholder for home page content */}
      <main className="flex-1">
        {/* Home page content will go here */}
      </main>

      <Footer />
    </div>
  );
}

import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Vehicle Tracking",
    description: "Track vehicles on a simulated map and manually update locations.",
    icon: "🚗",
  },
  {
    title: "Maintenance Scheduling",
    description: "Set reminders and view service history.",
    icon: "🛠️",
  },
  {
    title: "Driver Management",
    description: "Manage driver profiles and monitor performance.",
    icon: "👨‍✈️",
  },
  {
    title: "Route Optimization",
    description: "Simulate route suggestions with static data.",
    icon: "🗺️",
  },
  {
    title: "Fuel Management",
    description: "Track fuel consumption and detect inefficiencies.",
    icon: "⛽",
  },
  {
    title: "Trip Logging",
    description: "Drivers can log trip details in a form.",
    icon: "📝",
  },
  {
    title: "Geofencing Alerts",
    description: "Simulate alerts for vehicle boundary breaches.",
    icon: "📍",
  },
  {
    title: "Emergency Response",
    description: "Mock panic button for distress signals.",
    icon: "🚨",
  },
  {
    title: "Maintenance Cost Tracker",
    description: "Track expenses and generate cost reports.",
    icon: "💸",
  },
  {
    title: "Custom Reports",
    description: "Create personalized reports from dummy data.",
    icon: "📊",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-md fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">FleetMaster</h1>
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Fleet Management System
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Track, manage, and optimize your fleet – all in one place.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feat.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feat.title}</h4>
                <p className="text-gray-600 text-sm">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/26/08/41/truck-3101460_1280.jpg"
            alt="Fleet tracking illustration"
            className="w-full h-auto rounded-xl shadow-md"
          />
          <div>
            <h4 className="text-2xl font-bold mb-4">
              Why Choose FleetMaster?
            </h4>
            <p className="text-gray-700 mb-4">
              We provide a powerful, simulated fleet management experience that
              covers everything from vehicle tracking to analytics – perfect for
              demonstration and testing purposes.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Responsive design for all devices</li>
              <li>Role-based user access</li>
              <li>Visual reports & analytics</li>
              <li>Simulated emergency and geofence features</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 text-center">
        © {new Date().getFullYear()} FleetMaster — Simulated Fleet Management
      </footer>
    </div>
  );
}


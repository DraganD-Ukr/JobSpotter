import Sidebar from "../components/Sidebar";
import LightDarkToggle from "../components/LightDarkToggle";

export function Settings() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar should use its global styles */}
      <Sidebar />

      {/* Main Content uses the global "main-content" class */}
      <div className="main-content flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        {/* Settings Card uses the global "card" class */}
        <div className="card">
          <h2 className="text-xl mb-4">Dark Mode Toggle</h2>
          <div className="flex justify-between items-center">
            <span>Dark Mode</span>
            <LightDarkToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

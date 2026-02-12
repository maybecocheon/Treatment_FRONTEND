import Dashboard from "./components/Dashboard";
import Dashboard2 from "./components/Dashboard2";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full p-2">
      <Dashboard2 />
      <hr className="block md:hidden border-sky-50" />
    </div>
  );
}
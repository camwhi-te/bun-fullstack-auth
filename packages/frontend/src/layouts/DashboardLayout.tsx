import { Navbar } from "../components/Navbar";
import { Actionbar } from "../components/Actionbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-screen h-screen">
      <div className="p-4 lg:px-12 lg:py-24">
        <div className="-translate-y-[4.5vh]">{children}</div>
      </div>
      <Navbar />
      <Actionbar />
    </div>
  );
}
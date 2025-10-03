import { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

export function DashbaordLayout({ children }: { children: ReactNode }) {
    return (
        <div className="w-screen h-screen flex items-center justify-center p-4">
            {children}
            <Navbar />
        </div>
    );
}

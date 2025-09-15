import { Outlet } from "react-router-dom";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";

export function PublicLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export function PrivateLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            <div className="flex flex-1 container mx-auto px-4">
                <Sidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export function ControlPanelLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto flex flex-1 px-4 py-6 gap-6">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
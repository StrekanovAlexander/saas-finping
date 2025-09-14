import { Outlet } from "react-router-dom";
import Header from "../header/Header.jsx";
import HeaderWide from "../header/HeaderWide.jsx";
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
            <HeaderWide />
            <div className="flex flex-1 border bg-zinc-100 rouded-lg p-4">
                <Sidebar />
                <main className="flex-1 bg-zinc-50 border rounded-lg px-5 ml-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
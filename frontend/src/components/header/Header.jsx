import { Link } from "react-router-dom";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import NavMobile from './NavMobile.jsx';

export default function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
                <Link to="/" className="text-2xl font-bold text-teal-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d9488" width="32px" height="32px">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm10.5 9c0-1.66-3.34-3-7.5-3S7.5 19.34 7.5 21H22.5z"/>
                    </svg>
                    <h2 className="text-xl font-bold text-teal-600">FinPing</h2>
                </Link>
                <nav className="hidden md:flex space-x-6 font-medium">
                    <Link
                        to="/"
                        className="text-gray-600 hover:text-teal-600 transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/assets"
                        className="text-gray-600 hover:text-teal-600 transition"
                    >
                        Assets
                    </Link>
                    <Link
                        to="/how-it-works"
                        className="text-gray-600 hover:text-teal-600 transition"
                    >
                        How it works
                    </Link>
                    <Link
                        to="/contacts"
                        className="text-gray-600 hover:text-teal-600 transition"
                    >
                        Contacts
                    </Link>
                    { user && 
                        <Link
                            to="/dashboard/dashboard"
                            className="text-gray-600 hover:text-teal-600 transition"
                        >
                            Dashboard
                        </Link> 
                    }
                </nav>
                {!user ? (
                    <Link
                        to="/login"
                        className="hidden md:flex ml-4 px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-teal-600 hover:text-white transition"
                    >
                        Log in
                    </Link>
                ) : (
                    <button
                        onClick={logout}
                        className="hidden md:flex ml-4 px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-700 hover:bg-teal-600 hover:text-white transition"
                    >
                        Logout
                    </button>
                )}
                <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)} >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
            {menuOpen && (
                <NavMobile user={ user } logout={ logout } />
            )}
        </header>
    );
}

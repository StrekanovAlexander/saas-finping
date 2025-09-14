import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from './Logo.jsx';
import NavTop from './NavTop.jsx';
import NavMobile from './NavMobile.jsx';

function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                <a href="/"><Logo /></a>
                <NavTop user={ user } />
                <div className="flex items-center space-x-2">
                    {!user ? (
                        <Link 
                            className="hidden md:flex px-1 py-1 bg-white text-sm text-gray-600 border border-gray-600 border rounded-lg hover:bg-gray-600 hover:text-white transition"
                            to="/login">
                            <LogIn className="w-4 h-4" />
                        </Link>
                    ) : (
                        <button
                            onClick={logout}
                            className="hidden md:flex px-1 py-1 bg-white text-sm text-gray-600 border border-gray-600 border rounded-lg hover:bg-gray-600 hover:text-white transition"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)} >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <NavMobile user={ user } logout={ logout } />
            )}
        </header>
    );
}

export default Header;
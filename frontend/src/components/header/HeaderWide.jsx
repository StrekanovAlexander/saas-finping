import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from './Logo.jsx';
import NavTop from './NavTop.jsx';
import NavMobile from './NavMobile.jsx';

function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50 px-6">
            <div className="w-full mx-auto flex items-center justify-between py-3">
                <a href="/"><Logo /></a>
                <NavTop user={ user } />
                <div className="flex items-center space-x-2">
                    {!user ? (
                        <Link 
                            className="px-6 py-2 bg-gray-200 text-sm text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                            to="/login"
                        >
                            Login
                        </Link>    
                        ) : (
                        <button
                            onClick={logout}
                            className="px-6 py-2 bg-gray-200 text-sm text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                        >
                            Logout
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
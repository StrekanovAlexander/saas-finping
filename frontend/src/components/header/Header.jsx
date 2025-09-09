import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import Logo from './Logo';
import NavTop from './NavTop';
import NavMobile from './NavMobile';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                <a href="/"><Logo /></a>
                <NavTop />
                <div className="flex items-center space-x-2">
                    <a href="/login" className="md:flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 transition">
                        <LogIn className="w-5 h-5 mr-2" />Log In
                    </a>
                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)} >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <NavMobile />
            )}
        </header>
    );
}

export default Header;
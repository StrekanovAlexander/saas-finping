import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from './Logo.jsx';
import NavTop from './NavTop.jsx';
import NavMobile from './NavMobile.jsx';
import LinkBtn from '../forms/elements/LinkBtn.jsx';

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
                        <LinkBtn title="Sign in" icon="LogIn" url="/user/sign-in" hidden={ true } />
                    ) : (
                        <button
                            onClick={logout}
                            className="hidden md:flex px-4 py-2 bg-white text-sm text-red-400 border border-red-300 rounded-lg hover:bg-red-500 hover:text-white transition"
                        ><LogOut className="w-5 h-5" />Sign Out</button>
                    )}
                                        
                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)} >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <NavMobile isAuth={ isAuth } logout={ logout } />
            )}
        </header>
    );
}

export default Header;
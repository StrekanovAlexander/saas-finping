import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";
import Logo from './Logo';
import NavTop from './NavTop';
import NavMobile from './NavMobile';
import LinkBtn from '../forms/elements/LinkBtn';

function Header() {
    const { isAuth, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                <a href="/"><Logo /></a>
                <NavTop isAuth={ isAuth } />
                <div className="flex items-center space-x-2">
                    {!isAuth ? (
                        <LinkBtn title="Sign in" icon="LogIn" url="/user/sign-in" hidden={ true } />
                    ) : (
                        <button
                            onClick={logout}
                            className="hidden md:flex px-2 py-1.5 bg-white text-sm text-red-400 border border-red-300 rounded-lg hover:bg-red-500 hover:text-white transition"
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
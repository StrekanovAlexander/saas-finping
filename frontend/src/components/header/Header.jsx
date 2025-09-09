import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import Logo from './Logo';
import NavTop from './NavTop';
import NavMobile from './NavMobile';
import LinkBtn from '../forms/elements/LinkBtn';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
                <a href="/"><Logo /></a>
                <NavTop />
                <div className="flex items-center space-x-2">
                    <LinkBtn title="Sign in" icon="LogIn" url="/user/sign-in" hidden={ true } />
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
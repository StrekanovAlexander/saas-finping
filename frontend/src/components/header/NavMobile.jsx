import LinkBtn from '../buttons/LinkBtn.jsx';
import { LogOut } from 'lucide-react';

<LogOut />

export default function({ user, logout }) {
    return (
        <div className="md:hidden bg-white border-t shadow-md">
            <nav className="flex flex-col p-4 space-y-4 text-gray-600 font-medium">
                <a href="/" className="hover:text-emerald-600 transition">Home</a>
                <a href="/how-it-works" className="hover:text-emerald-600 transition">How it works</a>
                <a href="/contacts" className="hover:text-emerald-600 transition">Conacts</a>
                {!user ? (
                    <LinkBtn title="Login" icon="LogIn" url="/login" />
                ) : (
                    <button
                        className="flex justify-center align-center px-4 py-1.5 bg-white text-sm text-red-400 border border-red-300 rounded-lg hover:bg-red-500 hover:text-white transition"
                        onClick={ logout }
                    ><LogOut className="w-5 h-5 mr-1" />Logout</button>
                )}    
            </nav>
        </div>
    );
}
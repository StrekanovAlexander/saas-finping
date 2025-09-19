import { LogOut } from 'lucide-react';

<LogOut />

export default function({ user, logout }) {
    return (
        <div className="md:hidden bg-white border-t shadow-md">
            <nav className="flex flex-col p-4 space-y-4 text-gray-600 font-medium">
                <a href="/" className="hover:text-teal-600 transition">Home</a>
                <a href="/assets" className="hover:text-teal-600 transition">Home</a>
                <a href="/how" className="hover:text-teal-600 transition">How it works</a>
                <a href="/contacts" className="hover:text-teal-600 transition">Conacts</a>
                {!user ? (
                    <a href="/login" className="hover:text-teal-600 transition">Login</a>
                ) : (
                    <>
                        <a href="/manage/trackings" className="hover:text-teal-600 transition">Trackings</a>
                        <button 
                            type="button" 
                            className="text-start hover:text-teal-600 transition"
                            onClick={ logout }
                        >
                            Log Out
                        </button>
                    </>
                )}    
            </nav>
        </div>
    );
}
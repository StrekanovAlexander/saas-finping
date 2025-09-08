import { LogIn } from 'lucide-react';

export default function() {
    return (
        <div className="md:hidden bg-white border-t shadow-md">
            <nav className="flex flex-col p-4 space-y-4 text-gray-600 font-medium">
                <a href="#" className="hover:text-indigo-600 transition">Home</a>
                <a href="#" className="hover:text-indigo-600 transition">How it works</a>
                <a href="#" className="hover:text-indigo-600 transition">FAQ</a>
                <a href="#" className="hover:text-indigo-600 transition">Conacts</a>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                </button>
            </nav>
        </div>
    );
}
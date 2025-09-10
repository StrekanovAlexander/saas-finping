import { LogIn, UserPlus } from "lucide-react";

export default function({ title, icon }) {
    let iconBtn;
    switch(icon) {
        case 'UserPlus':
            iconBtn = <UserPlus className="w-5 h-5 mr-1" />;
            break;
        case 'LogIn':
            iconBtn = <LogIn className="w-5 h-5 mr-1" />;
            break;    
        default:
            iconBtn = null;    
    }

    return (
        <button type="submit" className="flex justify-center w-full text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 transition">
            { iconBtn } { title }
        </button>
    )
}
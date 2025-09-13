import { LogIn, UserPlus } from "lucide-react";

export default function({ title, icon, url, hidden }) {
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

    const classOptions = "flex justify-center align-center px-4 py-2 bg-white text-sm text-emerald-500 border border-emerald-500 rounded-lg hover:bg-emerald-600 hover:text-white transition";

    return (
        <a href={ url } title="Sign in" className={ hidden ? 'hidden md:' + classOptions : classOptions }>
            { iconBtn } { title }
        </a>
    )
}
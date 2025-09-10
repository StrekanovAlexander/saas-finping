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

    const classOptions = "flex justify-center align-center w-full text-emerald-500 bg-white border-2 border-emerald-500 rounded-lg text-sm hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition py-1.5 px-2";

    return (
        <a href={ url } title="Sign in" className={ hidden ? 'hidden md:' + classOptions : classOptions }>
            { iconBtn } { title }
        </a>
    )
}
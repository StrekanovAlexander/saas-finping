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

    const classOptions = "flex justify-center w-full text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg text-sm hover:bg-indigo-700 hover:text-white transition py-1.5 px-2";

    return (
        <a href={ url } title="Sign in" className={ hidden ? 'hidden md:' + classOptions : classOptions }>
            { iconBtn } { title }
        </a>
    )
}
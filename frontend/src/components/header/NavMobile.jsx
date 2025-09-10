import LinkBtn from '../forms/elements/LinkBtn';

export default function() {
    return (
        <div className="md:hidden bg-white border-t shadow-md">
            <nav className="flex flex-col p-4 space-y-4 text-gray-600 font-medium">
                <a href="/" className="hover:text-indigo-600 transition">Home</a>
                <a href="/how-it-works" className="hover:text-indigo-600 transition">How it works</a>
                <a href="/contacts" className="hover:text-indigo-600 transition">Conacts</a>
                <LinkBtn title="Sign in" icon="LogIn" url="/user/sign-in" />
            </nav>
        </div>
    );
}
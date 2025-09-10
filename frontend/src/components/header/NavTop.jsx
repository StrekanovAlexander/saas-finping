export default function({ isAuth }) {
    return (
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <a href="/" className="hover:text-emerald-600 transition">Home</a>
            <a href="/how-it-works" className="hover:text-emerald-600 transition">How it works</a>
            <a href="/contacts" className="hover:text-emerald-600 transition">Contacts</a>
            { isAuth && <a href="/user/dashboard" className="hover:text-emerald-600 transition">Dashboard</a> }
        </nav>
    );
}
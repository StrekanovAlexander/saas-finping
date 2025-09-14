export default function({ user }) {
    return (
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <a href="/" className="hover:text-teal-600 transition">Home</a>
            <a href="/assets" className="hover:text-teal-600 transition">Assets</a>
            <a href="/how-it-works" className="hover:text-teal-600 transition">How it works</a>
            <a href="/contacts" className="hover:text-teal-600 transition">Contacts</a>
            { user && <a href="/dashboard/dashboard" className="hover:text-teal-600 transition">Dashboard</a> }
        </nav>
    );
}
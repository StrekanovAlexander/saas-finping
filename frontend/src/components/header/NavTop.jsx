export default function() {
    return (
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <a href="/" className="hover:text-indigo-600 transition">Home</a>
            <a href="/how-it-works" className="hover:text-indigo-600 transition">How it works</a>
            <a href="/faq" className="hover:text-indigo-600 transition">FAQ</a>
            <a href="/contacts" className="hover:text-indigo-600 transition">Contacts</a>
        </nav>
    );
}
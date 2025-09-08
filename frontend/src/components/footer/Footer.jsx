function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="mt-12 text-gray-500">
            &copy; { currentYear } FinPing. All rights reserved.
        </footer>
    );
}

export default Footer;
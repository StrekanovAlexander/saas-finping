function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="my-12 text-gray-500 text-center">
            &copy; { currentYear } FinPing. All rights reserved.
        </footer>
    );
}

export default Footer;
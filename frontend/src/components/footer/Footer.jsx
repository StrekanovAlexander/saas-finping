import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold text-teal-600 flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d9488" width="32px" height="32px">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm10.5 9c0-1.66-3.34-3-7.5-3S7.5 19.34 7.5 21H22.5z"/>
                </svg>
                FinPing
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Real-time insights into crypto, fiat and commodities.
            </p>
          </div>
          <div className="flex flex-col space-y-2 font-medium">
            <a href="/" className="text-gray-600 hover:text-teal-600 transition">
              Home
            </a>
            <a
              href="/assets"
              className="text-gray-600 hover:text-teal-600 transition"
            >
              Assets
            </a>
            <a
              href="/how-it-works"
              className="text-gray-600 hover:text-teal-600 transition"
            >
              How it works
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-teal-600 transition"
            >
              Contact
            </a>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-3">Follow me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/StrekanovAlexander"
                target="_blank"
                className="text-gray-500 hover:text-teal-600 transition"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FinPing. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Powered by <span className="font-medium text-teal-600">CoinGecko</span> &{" "}
            <span className="font-medium text-teal-600">Yahoo Finance</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

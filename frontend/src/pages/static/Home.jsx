import AssetCards from "../../components/card/AssetCards.jsx";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="bg-white py-16 shadow-sm max-w-6xl">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Track Bitcoin, Gold, Oil & More in Real Time
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Stay ahead of the markets with live updates on cryptocurrencies, 
            commodities, and global currencies. Analyze trends, compare 
            performance, and make informed decisions with our easy-to-use platform.
          </p>
          {/* Cards */}
          <AssetCards />

          <div className="flex justify-center gap-4">
            <Link 
              className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold shadow hover:bg-teal-700 transition"
              to="/assets"
            >
              All assets
            </Link>
           
          </div>

        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose your favorite assets, set price alerts, and let our platform 
            do the work for you. Get instant email notifications when Bitcoin, 
            Gold, Oil, or other assets reach your chosen thresholds. All it 
            takes is a quick registration — after that, you’ll never miss 
            a market move again.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold shadow hover:bg-teal-700 transition"
              to="/register"
            >
              Get Started
            </Link>
            <Link 
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
              to="/how-it-works"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
    );
}

export default Home;
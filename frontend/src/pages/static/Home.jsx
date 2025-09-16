import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardAsset from "../../components/card/CardAsset.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";

function Home() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "https://app.finping.space/api/assets";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch assets");
        const data = await res.json();
        setAssets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const cryptos = assets.filter(el => el.type === "crypto" && el.prior === '1').slice(0, 3);
  const commodities = assets.filter(el => el.type === "commodity" && el.prior === '1').slice(0, 3);
  const fiats = assets.filter(el => el.type === "fiat" && el.prior === '1').slice(0, 3);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="bg-white py-16 shadow-sm w-full border-b border-gray-200">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Track Bitcoin, Gold, Oil & More in Real Time
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Stay ahead of the markets with live updates on cryptocurrencies,
              commodities, and global currencies. Analyze trends, compare
              performance, and make informed decisions with our easy-to-use
              platform.
            </p>
            {/* Loading */}
            {loading && <div className="mb-10"><Spinner/></div>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {/* Cards */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <CardAsset 
                  title="Cryptocurrencies" 
                  description="Track Bitcoin, Ethereum, and more." 
                  data={cryptos} 
                />
                <CardAsset 
                  title="Commodities" 
                  description="Stay updated on gold, oil, and natural gas." 
                  data={commodities} 
                />
                <CardAsset 
                  title="Currencies" 
                  description="Monitor USD, EUR, JPY, and more."
                  data={fiats}  
                />
              </div>
            )}  
            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold shadow hover:bg-teal-700 transition"
                to="/assets"
              >
                More Data
              </Link>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section className="bg-gray-50 py-20 w-full">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose your favorite assets, set price alerts, and let our platform
              do the work for you. Get instant email notifications when Bitcoin,
              Gold, Oil, or other assets reach your chosen thresholds. All it
              takes is a quick registration — after that, you’ll never miss a
              market move again.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold shadow hover:bg-teal-700 transition"
                to="/register"
              >
                Get Started
              </Link>
              {/* <Link
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
                to="/how-it-works"
              >
                Learn More
              </Link> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

import { Database, Server, Globe, Code } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <section className="mb-12">  
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        About the Project
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        This platform is designed to track prices of cryptocurrencies, 
        commodities, and global currencies in real time. 
        It helps users stay informed about market trends and receive alerts 
        when prices change. The goal is to make financial data easy to access, 
        reliable, and actionable.
      </p>
      </section>

      {/* <section className="bg-white shadow-sm rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Project Goal
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The goal of this project is to simplify market monitoring and 
          provide timely notifications about important price changes. 
          Users can register, choose assets to track, and receive alerts 
          directly to their email. 
          This saves time and ensures they never miss crucial movements 
          in Bitcoin, Gold, Oil, and more.
        </p>
      </section> */}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Technologies Used
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Node.js */}
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Server className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Node.js</h3>
              <p className="text-gray-600 text-sm">
                Backend for API and cron jobs
              </p>
            </div>
          </div>

          {/* React */}
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Code className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">React</h3>
              <p className="text-gray-600 text-sm">
                Frontend with TailwindCSS styling
              </p>
            </div>
          </div>

          {/* MySQL */}
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Database className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">MySQL</h3>
              <p className="text-gray-600 text-sm">
                Relational database for storing assets and tracking
              </p>
            </div>
          </div>

          {/* Tailwind */}
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Globe className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">TailwindCSS</h3>
              <p className="text-gray-600 text-sm">
                Utility-first styling for fast UI development
              </p>
            </div>
          </div>
          {/* Express */}
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Server className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Express.js</h3>
              <p className="text-gray-600 text-sm">
                Lightweight framework for building REST APIs
              </p>
            </div>
          </div>
          {/* Data APIs */}
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Globe className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Market Data APIs</h3>
              <p className="text-gray-600 text-sm">
                Yahoo Finance, CoinGecko, FXRates for live asset prices
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

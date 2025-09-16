import { Link } from "react-router-dom";
import { Code, Database, Server, Globe, Github } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* <section className="mb-12">  
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
      </section> */}
      <section className="mb-12 text-center">  
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          About the Project
        </h1>
      </section>

      <section className="mb-12 max-w-4xl mx-auto">
        <div className="flex justify-center">
          <img src="/de.svg" alt="Deutschland" className="w-8 h-auto" />
        </div>
        <p className="text-lg text-gray-600 leading-relaxed mt-6 mb-8 text-center">
          Mein Name ist <span className="font-medium">Oleksandr Strekanov</span>. Derzeit bin ich auf Jobsuche in Deutschland und möchte dieses Projekt als Beispiel meiner aktuellen 
          Fähigkeiten in der Webentwicklung vorstellen.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
          An diesem Projekt habe ich am 7. September 2025 begonnen zu arbeiten. Es befindet sich derzeit noch in der Entwicklung, aber die Idee und die Funktionalität sind bereits klar. 
          Es handelt sich um einen SaaS-Service, der dem Nutzer hilft, Veränderungen auf den Märkten für Währungen und Rohstoffe zu verfolgen.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
          Die Funktionalität der Anwendung ermöglicht einen Einstieg in das System im Demonstrationsmodus, um zu sehen, wie der Nutzer die Tracking-Funktionen für die gewünschten Ressourcen bedienen kann. Um sich im Demonstrationsmodus anzumelden, 
          setzen Sie einfach das Häkchen <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600" target="_blank">Demonstration mode</Link>  im Login-Formular und melden sich an. Danach wird alles intuitiv verständlich sein.        
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
          <div className="bg-white shadow rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Technologies Used</h3>
              <p className="text-gray-600 text-sm text-center">
                Node.js, MySQL, Sequelize, Express.js, React, Tailwind CSS. 
                Market Data APIs: Yahoo Finance, CoinGecko, FXRates
              </p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-center gap-4 hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Project repository</h3>
              <p className="text-gray-600 text-sm">
                <Link
                  className="text-gray-600 hover:text-orange-600"
                  to="https://github.com/StrekanovAlexander/saas-finping"
                  target="_blank"
                >
                  https://github.com/StrekanovAlexander/saas-finping  
                </Link>
              </p>
          </div>
        </div>  
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

      {/* <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Technologies Used
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Server className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Node.js</h3>
              <p className="text-gray-600 text-sm">
                Backend for API and cron jobs
              </p>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Code className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">React</h3>
              <p className="text-gray-600 text-sm">
                Frontend with TailwindCSS styling
              </p>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Database className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">MySQL</h3>
              <p className="text-gray-600 text-sm">
                Relational database for storing assets and tracking
              </p>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Globe className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">TailwindCSS</h3>
              <p className="text-gray-600 text-sm">
                Utility-first styling for fast UI development
              </p>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <Server className="text-teal-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Express.js</h3>
              <p className="text-gray-600 text-sm">
                Lightweight framework for building REST APIs
              </p>
            </div>
          </div>
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
      </section> */}

    </div>
  );
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Routing from "./routes";
import { Header, Footer } from './components';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
            <main className="flex-1">
              <Routing />
            </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/Footer';
import HomePage from "./components/home/HomePage";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import AboutPage from "./components/about/AboutPage";
import SupportPage from "./components/support/SupportPage";
import ChatsPage from "./components/chats/ChatsPage";
import LoadingPage from "./components/loading/LoadingPage";
import { checkAuthStatus } from './utilities/auth/auth';
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Minimum loading time for smooth transition
        checkAuthStatus((isValid) => {
          setIsAuthenticated(isValid);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading || isAuthenticated === null) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chats" element={isAuthenticated ? <ChatsPage /> : <Navigate to="/login" replace />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/chats" replace /> : <LoginPage />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/chats" replace /> : <RegisterPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/blog" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

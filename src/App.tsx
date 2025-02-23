import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.tsx';
import Footer from './components/footer/Footer.tsx';
import HomePage from './components/homepage/HomePage.tsx';
import RegisterPage from "./components/register/RegisterPage.tsx";
import LoginPage from "./components/login/LoginPage.tsx";
import AboutPage from "./components/about/AboutPage.tsx";
import SupportPage from "./components/support/SupportPage.tsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/blog" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default App

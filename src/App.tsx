import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header/header.tsx';
import Footer from './components/footer/Footer.tsx';
import HomePage from './components/homepage/HomePage.tsx';
import RegisterPage from "./components/register/RegisterPage.tsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/support" element={<HomePage />} />
                    <Route path="/blog" element={<HomePage />} />
                    <Route path="/about" element={<HomePage />} />
                    <Route path="/login" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    </>
  )
}

export default App

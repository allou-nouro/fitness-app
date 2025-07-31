// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Intero from './pages/intro';
import { ResultsProvider } from './pages/calculatorFile/resultContext';
import Home from './pages/home';
import FinalNav from './pages/finalNav';
import DetaillPecip from './pages/DetaillRecip';
import SearchBar from './pages/searche';
import SearchPage from './pages/searchePage';
import { SliderProvider } from './pages/sliderContex';
import Calculator from './pages/Calculator';
import { useState } from 'react';
import RuseltFile from './pages/calculatorFile/resulFile';
import Favorite from './pages/Favorite';
import { FavoritesProvider } from './pages/FavoritProvider';
import './App.css';
function AppContent() {
  const location = useLocation();
  const show = location.pathname !== '/';
const showSearch = location.pathname === '/home' || location.pathname.startsWith('/home/serche');
const [valueSarche,setValueSarche]=useState("")
  return (
    <>
      {showSearch && <SearchBar value={valueSarche} setvalue={setValueSarche} />}
      {show && <FinalNav />}
      
      <Routes>
        <Route path="/" element={<Intero />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/serche/:query" element={<SearchPage/>} />
        <Route path="/home/details/:id" element={<DetaillPecip />} />
        <Route path="/favorites/details/:id" element={<DetaillPecip />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/calculator/result" element={<RuseltFile />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <FavoritesProvider>
      <SliderProvider>
        <ResultsProvider>
      <AppContent />
      </ResultsProvider>
      </SliderProvider>
      </FavoritesProvider>
    </Router>
  );
}

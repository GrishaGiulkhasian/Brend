// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Добавляем HelmetProvider
import Header from '../Header/Header';
import Header_mini from '../Header_mini/Header_mini';

// Ленивые импорты
const ProductCatalog = React.lazy(() => import('../Cotolog/Cotolog'));
const Detaloc = React.lazy(() => import('../Detaloc/Detaloc'));
const Favourites = React.lazy(() => import('../Favorites/Favourites'));
const SearchResults = React.lazy(() => import('../SearchResults/SearchResults'));

const App: React.FC = () => {
    return (
        <HelmetProvider>
            <Router>
                <Header />
                <Header_mini />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<ProductCatalog />} />
                        <Route path="/product/:id" element={<Detaloc />} />
                        <Route path="/favourites" element={<Favourites />} />
                        <Route path="/search" element={<SearchResults />} />
                    </Routes>
                </Suspense>
            </Router>
        </HelmetProvider>
    );
};

export default App;

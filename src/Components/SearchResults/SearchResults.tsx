import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import style from './SearchResults.module.scss';
import { ProductCard } from '../Cotolog/Cotolog'; // используем компонент карточки товара

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

const SearchResults: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || ''; // получаем строку поиска из URL
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Загружаем все продукты при монтировании компонента
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data: Product[]) => {
                setProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        // Фильтруем продукты на основе поискового запроса
        setFilteredProducts(
            products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, products]);

    return (
        <div className={style.search_results}>
            <h2>Results for "{query}":</h2>
            {filteredProducts.length > 0 ? (
                <div className={style.product_list}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default SearchResults;

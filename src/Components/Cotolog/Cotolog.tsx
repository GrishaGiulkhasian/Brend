// src/Components/Cotolog/Cotolog.tsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import style from './Cotolog.module.scss';
import { Love } from '../../assec/index';
import Filter from '../filtr/filtr';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from '../../slices/productsSlice';
import { AppDispatch } from '../../store/store';

// Интерфейс для типа данных продукта
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

// Компонент для карточки продукта
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className={style.product_card} onClick={handleCardClick}>
            <div className={style.product_card_inner}>
                <div>
                    <p>{product.category}</p>
                    <h3>{product.title}</h3>
                </div>
                <div>
                    <Love />
                </div>
            </div>
            <img src={product.image} alt={product.title} />
            <div className={style.sum_card}>{`${product.price} $`}</div>
        </div>
    );
};

// Основной компонент каталога товаров
const ProductCatalog: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

    // Загрузка данных о продуктах при загрузке компонента
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Фильтрация и сортировка товаров
    const filteredProducts = selectedCategories.length > 0
        ? products.filter((product) => selectedCategories.includes(product.category))
        : products;

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        if (sortOrder === 'desc') return b.price - a.price;
        return 0;
    });

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {/* SEO-метатеги с помощью Helmet */}
            <Helmet>
                <title>Product Catalog - Your Store Name</title>
                <meta name="description" content="Browse our extensive catalog of clothing items." />
                <meta name="keywords" content="clothing, online store, fashion, catalog, shopping" />
            </Helmet>

            {/* Фильтрация и отображение продуктов */}
            <Filter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                setSortOrder={setSortOrder}
            />
            <div className={style.product_catalog}>
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export { ProductCard };
export default ProductCatalog;

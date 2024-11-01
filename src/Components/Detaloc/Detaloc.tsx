import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Detaloc.module.scss';
import { Star } from '../../assec/index';
import { Love } from '../../assec/index';

// Интерфейс для типа данных продукта
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const Detaloc: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .then((data: Product) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching product details:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    const addToFavourites = () => {
        if (product) {
            const storedFavourites = localStorage.getItem('favourites');
            const favourites = storedFavourites ? JSON.parse(storedFavourites) : [];
            const isFavourite = favourites.some((fav: Product) => fav.id === product.id);

            if (!isFavourite) {
                favourites.push(product);
                localStorage.setItem('favourites', JSON.stringify(favourites));
                alert("Product added to favourites");
            } else {
                alert("Product is already in favourites");
            }
        }
    };

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className={style.product_details} style={{marginLeft: '310px'}}>
            <div className={style.name} style={{display: 'flex'}}>
                <div className={style.fill3} style={{marginTop: '3px'}}>
                    <span>Main</span><span>{' > '}</span><span>Catalog</span>{' > '}
                </div>
                <h2 style={{margin: '0', fontSize: '15px', fontWeight: '700', marginTop: '5px', marginLeft: '3px'}}>{product.title}</h2>
            </div>
            <div style={{display: 'flex'}}>
                <div>
                    <img src={product.image} alt={product.title} className={style.product_im}/>
                </div>
                <div style={{marginTop: '40px', marginLeft: '45px', width: '700px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div className={style.det1}>{product.title}</div>
                            <div className={style.det2} style={{marginTop: '10px'}}>{`${product.rating.rate} / 5 (${product.rating.count} reviews)`}</div>
                        </div>
                        <div>
                            <div className={style.det6} onClick={addToFavourites}>
                                <span style={{fontSize: '14px', fontWeight: '400'}}>Add to favourite</span>
                                <Love style={{marginLeft: '15px'}}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.det5}></div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div className={style.det7}>Description</div>
                            <div className={style.det3} style={{marginTop: '15px'}}>{product.description}</div>
                        </div>
                        <div>
                            <div className={style.det4} style={{marginTop: '10px'}}>{`${product.price} $`}</div>
                            <div className={style.det8}>Купить</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detaloc;

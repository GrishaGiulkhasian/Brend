import React, { useState, useEffect } from 'react';
import style from './Favourites.module.scss';


interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

const Favourites: React.FC = () => {
    const [favourites, setFavourites] = useState<Product[]>([]);


    useEffect(() => {
        const storedFavourites = localStorage.getItem('favourites');
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
        }
    }, []);

    const handleRemoveFavourite = (productId: number) => {
        const updatedFavourites = favourites.filter(product => product.id !== productId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    if (favourites.length === 0) {
        return <p>No favourite products found</p>;
    }

    return (
        <div className={style.favourites}>
            <div className={style.favourites1}>Your Favourites</div>
            <div className={style.favourites2}></div>
            <div className={style.favourites3}>1 item</div>
            <div className={style.favourites_list}>
                {favourites.map(product => (
                    <div key={product.id} className={style.product_card}>
                        <div style={{display: 'flex'}}>
                            <div>
                                <img src={product.image} alt={product.title} className={style.favourites4}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '800px'}}>
                                <div style={{marginLeft: '50px', }}>
                                    <div style={{marginTop: '30px', fontSize: '14px', fontWeight: '400'}}>{product.category}</div>
                                    <div style={{marginTop: '17px', fontSize: '20', fontWeight: '900', width: '215px'}} className={style.favourites5}>{product.title}</div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className={style.favourites6}>{`${product.price} $`}</div>
                                    <button className={style.favourites7} onClick={() => handleRemoveFavourite(product.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favourites;

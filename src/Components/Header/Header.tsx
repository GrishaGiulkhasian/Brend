import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProducts } from '../../slices/productsSlice';
import style from './Header.module.scss';
import { Lupa } from '../../assec';
import { Love } from '../../assec';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const goToFavourites = () => {
        navigate('/favourites');
    };

    // Функция для отправки экшена filterProducts при изменении поискового запроса
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchQuery(term);
        dispatch(filterProducts(term)); // отправляем поисковый запрос для фильтрации товаров
    };

    // Обработчик нажатия Enter или клика для поиска
    const handleSearch = (e: React.KeyboardEvent | React.MouseEvent) => {
        if (e.type === 'click' || (e as React.KeyboardEvent).key === 'Enter') {
            navigate(`/search?query=${searchQuery}`); // перенаправление на страницу поиска
        }
    };

    return (
        <div className={style.head}>
            <div>
                <div className={style.logo3}>clothes store</div>
                <div className={style.logo1}><span className={style.logo2}>Gu</span>shop</div>
            </div>
            <div className={style.search_container}>
                <input
                    className={style.search_input}
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange} // вызываем фильтрацию при изменении текста
                    onKeyDown={handleSearch} // запускаем поиск при нажатии Enter
                />
                <Lupa className={style.search_icon} onClick={handleSearch} /> {/* поиск по клику */}
            </div>
            <div className={style.free_container} onClick={goToFavourites}>
                <Love className={style.icon} />
                <div className={style.icon2}>Favourite</div>
            </div>
        </div>
    );
};

export default Header;

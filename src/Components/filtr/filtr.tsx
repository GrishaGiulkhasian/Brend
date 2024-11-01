import React, { useState } from "react";
import { Vector } from '../../assec/index';
import style from './filtr.module.scss';

interface FilterProps {
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc' | ''>>;
}

const Filter: React.FC<FilterProps> = ({ selectedCategories, setSelectedCategories, setSortOrder }) => {
    const [showPriceOptions, setShowPriceOptions] = useState(false);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) 
                ? prev.filter((c) => c !== category) 
                : [...prev, category]
        );
    };

    const handleSortOrderChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        setShowPriceOptions(false);
    };

    return (
        <div className={style.parent}>
            <div>
                <div className={style.fill_inner}>
                    <div className={style.fill_title}>Filters</div>
                    <div className={style.fill}>
                        <input
                            type="checkbox"
                            className={style.che}
                            checked={selectedCategories.includes("women's clothing")}
                            onChange={() => handleCategoryChange("women's clothing")}
                        />
                        <div className={style.fil_text}>women’s clothing</div>
                    </div>
                    <div className={style.fill}>
                        <input
                            type="checkbox"
                            className={style.che}
                            checked={selectedCategories.includes("men's clothing")}
                            onChange={() => handleCategoryChange("men's clothing")}
                        />
                        <div className={style.fil_text}>men’s clothing</div>
                    </div>
                    <div className={style.fill}>
                        <input
                            type="checkbox"
                            className={style.che}
                            checked={selectedCategories.includes("electronics")}
                            onChange={() => handleCategoryChange("electronics")}
                        />
                        <div className={style.fil_text}>electronics</div>
                    </div>
                    <div className={style.fill}>
                        <input
                            type="checkbox"
                            className={style.che}
                            checked={selectedCategories.includes("jewelery")}
                            onChange={() => handleCategoryChange("jewelery")}
                        />
                        <div className={style.fil_text}>jewelery</div>
                    </div>
                </div>
            </div>
            <div className={style.fill2}>
                <div className={style.fill3}>
                    <span>Main</span><span>{' > '}</span><span><strong>Catalog</strong></span>
                </div>
                <div className={style.fill4}>Catalog</div>
                <div className={style.fill5} onClick={() => setShowPriceOptions(!showPriceOptions)}>
                    Price
                    <Vector className={style.Vec} />
                    {showPriceOptions && (
                        <div className={style.dropdown}>
                            <div className={style.option} onClick={() => handleSortOrderChange('asc')}>
                                По возрастанию
                            </div>
                            <div className={style.option} onClick={() => handleSortOrderChange('desc')}>
                                По убыванию
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;

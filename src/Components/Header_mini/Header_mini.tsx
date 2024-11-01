import React from "react";
import style from './Header_mini.module.scss'

const Header_mini: React.FC = () => {
    return(
        <div className={style.head_inner}>
            <div className={style.bord}></div>
            <div className={style.bord_inner}>
                <div className={style.bord_inner_ser}>Main page</div>
                <div className={style.bord_inner_ser}>Delivery</div>
                <div className={style.bord_inner_ser}>Contact</div>
                <div className={style.bord_inner_ser}>Blog</div>
            </div>
            <div className={style.bord}></div>
        </div>
    );
}

export default Header_mini;
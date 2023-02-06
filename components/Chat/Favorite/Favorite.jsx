import React, { useState, useEffect } from "react";
import style from "./Favorite.module.css";

export default function Favorite() {
    const [favorited, setFavorited] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const set = () => {
        setFavorited(!favorited);
        if(favorited) {
            setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
       

    }
    return (
        <div>
            <div className={`${style.heart} ${favorited ? style.heartSelected :  style.heartNoselected}`} onClick={() => set()}></div>
            <div className={`text-white`} style={quantity ? {fontWeight: 'bold'} : {}}> {quantity}</div>
        </div>
    )
}
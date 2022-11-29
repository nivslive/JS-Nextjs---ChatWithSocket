import React from "react";
import style from "./Logo.module.css";
// import dynamic from "next/dynamic";

export default function List() {
    return (
    <div className={`${style.logoBox} d-flex justify-content-center align-items-center`}>
      <h5 className={`${style.littleLogo}`}> yorus.club </h5> 
      <img className={style.logoIcon} src="../icon.png"/>
    </div>
    );
}

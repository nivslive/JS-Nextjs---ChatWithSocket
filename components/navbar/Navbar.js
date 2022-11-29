import socket from "../../server/socketio";
import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import dynamic from "next/dynamic";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Navbar(props) {
  let me = props.user;
  let room = props.room;

  return (
    <header className="d-flex justify-content-center py-3 bg-primary" style={{transform: 'translateY(-200px)'}}>
      <div className="dropdown text-center" id={style.Contain}>
      <p className={style.user} style={{'fontWeight': 'bold'}}> QUARTO:  { room } </p>
        <a
          href="#"
          className="d-block text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={me.IMAGE_PROFILE !== undefined ? me.IMAGE_PROFILE : 'chater.png'}
            alt="mdo"
            width="32"
            height="32"
            className="rounded-circle"
          />
        </a>
        <p className={style.user}>{"@" + me.USER}</p>
        <img style={{'width': '50px', 'borderRadius': '50px'}} />
      </div>
    </header>
  );
}

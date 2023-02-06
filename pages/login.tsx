import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Login() {
  return (
        <div className="registration-form">
          <form onSubmit={form}>
            <Logo />
            <div className="">
              <span>
                <p className=""><span className="font-weight-bold">Quarto:</span> {response.room}</p>
              </span>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control item"
                id="username"
                placeholder="Escolha um nome inicial"
                onChange={setUser}
              />
            </div>
            <div>
		      Select an image file: 
		      <input type="file" id="fileInput" />
	        </div>
	        <div style={{'width': '50px'}} id="fileDisplayArea"></div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-block create-account"
                onClick={form}
              >
                Entrar numa sala aleatória
              </button>
            </div>
          </form>
          <div className="social-media">
            <a>Entre aleatóriamente em uma das salas.</a>
            <br />
            <a>Conheça diversas pessoas ao redor do mundo. </a>
            <br />
            <a>Comece agora!</a>
          </div>
          <div id="page-wrapper">



        </div>
    </div>
  );
}

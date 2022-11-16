import socket from "./socketio";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
//import messages from "../components/messages/Messages";
import { setCookies, useCookies } from "react-cookie";
import { useRouter } from "next/router";
import style from "../styles/Home.module.css";

export default function home() {
  const [Users, setUsers] = useState({});
  const [logged, setLogged] = useState(0);
  var username = Users;

  const setUser = (e) => {
    setUsers({...Users,"USER": e.target.value});
    localStorage.setItem('user', JSON.stringify(Users))
  };

  const form = (e) => {
    console.log(Users)
    if (Users !== "") {
      setLogged(1);
    } else {
      window.alert("Cadastre-se. porra.");
    }
  };
  useEffect(() => {
    var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

    console.log(fileInput)
    try{
      fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
      console.log(file, 'file')
			var imageType = /image.*/;

			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					fileDisplayArea.innerHTML = "";

					var img = new Image();
					img.src = reader.result;
          setUsers({...Users, "IMAGE_PROFILE": reader.result })
					fileDisplayArea.appendChild(img);
				}
        
				reader.readAsDataURL(file);	
        // fileDisplayArea.getElementsByTagName('img').style.width = '50px'
			} else {
				fileDisplayArea.innerHTML = "File not supported!"
			}
		});
    const img = document.querySelector('#fileDisplayArea img')
    img.style.width = '90px'
    img.style.borderRadius = '70px'

    }catch(e) {

    }
		
  })

  const Messages = dynamic(() => import("../components/messages/Messages"));
  const Navbar = dynamic(() => import("../components/navbar/Navbar"));
  return (
    <div className="main" style={{ left: "50%" }}>
      {!logged ? (
        <div className="registration-form">
          <form onSubmit={form}>
            <div className="title">
              <span>
                <p className="">NEXUS</p>
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
            <div className="d-flex justify-content-center align-items-center m-auto">
            <div>
		      Aplique uma imagem: 
		      <input type="file" id="fileInput" />
	        </div>
	        <div style={{'width': '50px'}} id="fileDisplayArea"></div>
            </div>

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
      ) : (
        <div className={style.Main}>
          <Navbar user={username} />
          <Messages user={username} />
        </div>
      )}
    </div>
  );
}

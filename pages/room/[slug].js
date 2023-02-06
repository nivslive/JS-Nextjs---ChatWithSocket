import axios from 'axios';
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import style from "../../styles/Home.module.css";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import {selectAuthState} from '../../slices/authSlice'
export default function Home() {
  const [Users, setUsers] = useState({});
  const [logged, setLogged] = useState(0);
  const router = useRouter();
  const [room, setRoom] = useState(''); 
  const [response, setResponse] = useState([]);
  const [responsed, setResponsed] = useState(true);
  let username = Users;

  const setUser = (e) => {

    setUsers({...Users,"USER": e.target.value});
  };

  const form = (e) => {
    console.log(Users)
    if (Users !== "") {
      setLogged(1);
    } else {
      window.alert("Cadastre-se. porra.");
    }
  };
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authState, 'authstate');
    setTimeout(() => {
      console.log(router.query.slug)
      if(responsed) {
        axios.get('http://localhost:3333/chat/room/' + router.query.slug).then(v => {
          console.log(v)
          setResponse(v.data)
          setRoom(v.data.room)
          setResponsed(false)
        })
      }
    }, 1000)

    // setRoom(router.query.slug)
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
          img.classList.add('imageFlask')
          setUsers({...Users, "IMAGE_PROFILE": reader.result })
					fileDisplayArea.appendChild(img);
          document.querySelector('#fileDisplayArea img').style.width = '50px'
				}

				reader.readAsDataURL(file);	
			} else {
				fileDisplayArea.innerHTML = "File not supported!"
			}
		});
    document.querySelector('#fileDisplayArea img').style.width = '50px'

    }catch(e) {

    }
		
  })

  const Messages = dynamic(() => import("../../components/messages/Messages.tsx"));
  const Navbar = dynamic(() => import("../../components/navbar/Navbar"));
  const Logo = dynamic(() => import("../../components/Logo/Logo"));
  return (
    <div className="main" style={{ left: "50%" }}>
      {!logged ? (
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
      ) : (
        <div className={style.Main}>
          <Navbar user={username} room={room} />
          <Messages slug={router.query.slug} response={response} user={username} />
        </div>
      )}
    </div>
  );
}

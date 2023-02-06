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
  const [response, setResponse] = useState<any>([]);
  const [responsed, setResponsed] = useState(true);
  let username = Users;

  const setUser = (e: any) => {

    setUsers({...Users,"USER": e.target.value});
  };

  const form = (e: any) => {
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
        axios.get('http://localhost:3333/chat/room/' + router.query.slug).then((v: any) => {
          console.log(v)
          setResponse(v.data)
          setRoom(v.data.room)
          setResponsed(false)
        })
      }
    }, 1000)

    // setRoom(router.query.slug)
    const fileInput: HTMLElement | null  | any = document.getElementById('fileInput');
		const fileDisplayArea: any = document.getElementById('fileDisplayArea');
    try{
      if(!fileInput) return
      fileInput.addEventListener('change', function(e: Event) {
			const file: any = fileInput.files[0];
      console.log(file, 'file')
			const imageType = /image.*/;

			if (file.type.match(imageType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					fileDisplayArea.innerHTML = "";

					let img: any = new Image();
					img.src = reader.result;
          img.classList.add('imageFlask')
          setUsers({...Users, "IMAGE_PROFILE": reader.result })
					fileDisplayArea.appendChild(img);
          document.querySelector<any>('#fileDisplayArea img').style.width = '50px'
				}

				reader.readAsDataURL(file);	
			} else {
				fileDisplayArea.innerHTML = "File not supported!"
			}
		});
    document.querySelector<any>('#fileDisplayArea img').style.width = '50px'

    }catch(e) {

    }
		
  })

  const Messages = dynamic(() => import("../../components/messages/Messages"));
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

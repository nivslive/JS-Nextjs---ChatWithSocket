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
<div>
  Oi amigos!
</div>
  );
}

import axios from 'axios';
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import style from "../../styles/Home.module.css";
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import {selectAuthState} from '../../slices/authSlice'
import Login from '../../components/Login';
export default function Home() {
  const [Users, setUsers] = useState({});
  const [logged, setLogged] = useState(0);
  const router = useRouter();
  const [room, setRoom] = useState(''); 
  const [response, setResponse] = useState<any>([]);
  let username = Users;


  const Messages = dynamic(() => import("../../components/messages/Messages"));
  const Navbar = dynamic(() => import("../../components/navbar/Navbar"));
  return (
    <div className="main" style={{ left: "50%" }}>
      {logged ? (
        <Login />
      ) : (
        <div className={style.Main}>
          <Navbar user={username} room={room} />
          <Messages slug={router.query.slug} response={response} user={username} />
        </div>
      )}
    </div>
  );
}

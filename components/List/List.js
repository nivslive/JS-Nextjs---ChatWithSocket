import React, { useState, useEffect } from "react";
import style from "./List.module.css";
import axios from 'axios';
// import dynamic from "next/dynamic";

export default function List() {
    const [filter, setFilter] = useState([]);
    useEffect(() => {
  
      // console.log(Object.entries(allRooms))
    })
    const showRooms = async () => {
      const filtered = []
      let response = []
      await axios.get('http://localhost:3333/chat').then((v) => {
        response = v.data
      })
      Object.entries(response).map((v) => {
        filtered.push(Object.entries(v[1]))
      })
      setFilter(filtered)
      console.log(filtered)
    }
    return (
  <div classList={style.modalListRooms}>
    <button onClick={() => showRooms()}> Ver quartos</button>
    {filter.map((item, key) => 
          <div style={{color: `white`}} key={key}>
            {item[1][1]}
          </div>)}
    </div>
    );
}

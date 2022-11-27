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
      let filtered = []
      let response = []
      await axios.get('http://localhost:3333/chat').then((v) => {
        response = v.data
      })
      console.log(response, 'res')
      
      Object.entries(response).map((v) => {
        filtered.push(Object.entries(v[1]))
      })
      
      setFilter(filtered)

      filtered.map(v => {
        v[6] = Object.entries(v[6])
      })

      filtered.map(v => {
       v[6][1][1] = v[6][1][1] !== null && Object.entries(v[6][1][1])
      })

      console.log(filtered, 'filtered')
    }
    return (
  <div className={style.modalListRooms}>
    <button onClick={() => showRooms()}> Ver quartos</button>
    {filter.map((item, key) => 
          <div className={style.itemModalListRooms} style={{color: `white`}} key={key}>
           <h6>  {item[1][1]} </h6>
          <a href={`room/${item[2][1]}`}> Ir </a>
          </div>)}
    </div>
    );
}

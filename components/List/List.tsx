import React, { useState, useEffect } from "react";
import style from "./List.module.css";
import axios from 'axios';
// import dynamic from "next/dynamic";

export default function List(props: any) {
    const [filter, setFilter] = useState<any[]>([]);
    const [created, setCreated] = useState(false);
    useEffect(() => {

      if(!created) {
        showRooms()
        setCreated(true)
      }
      // console.log(Object.entries(allRooms))
    })
    
    const showRooms = async () => {
      let filtered: any[] = []
      let res: any[] = []

      await axios.get('http://localhost:3333/chat').then((v) => {
      res = v.data
      console.log(res, 'rees')
      })

      Object.entries<any[]>(res).map((v: any) => {
        filtered.push(Object.entries<any>(v[1]));
      })
      
      filtered.map(v => {
        v[6] = Object.entries(v[6])
      })

      filtered.map(v => {
        v[5][1] = v[5][1] !== null && Object.entries(v[5][1])
        v[6][1][1] = v[6][1][1] !== null && Object.entries(v[6][1][1])
      })
      setFilter(filtered)
    }
    return (
  <div className={`${style.modalListRooms} ${props.listInsideChat ? style.insideChat : ''}`}>
    <span className="d-flex justify-content-center">
    <button onClick={() => showRooms()}> Todos </button>
    <button onClick={() => showRooms()}> Mais Populares</button>
    </span>

    {filter.map((item, key) => 
          <div className={style.itemModalListRooms} style={{color: `white`}} key={key}>
              <h6>  {item[1][1]} </h6>
              <div className={style.modalListItemOption}>
                <span>{item[5][1].length} </span>
                <a href={`room/${item[2][1]}`}> Ir </a>
              </div>
          </div>)}
    </div>
    );
}

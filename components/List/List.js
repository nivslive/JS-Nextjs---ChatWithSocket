import React, { useState, useEffect } from "react";
import style from "./List.module.css";
import axios from 'axios';
import { Filter } from "../../helpers/Filter";
// import dynamic from "next/dynamic";

export default function List() {
    const [filter, setFilter] = useState([]);
    const [created, setCreated] = useState(false);
    useEffect(() => {
      if(created) {
        let filtered = []
        let res = []
        (async function() {
          await axios.get('http://localhost:3333/chat').then((v) => {
            res = v.data
            console.log(res, 'rees')
            })
        })()
        Object.entries(res).map((v) => {
          filtered.push(Object.entries(v[1]))
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
      // console.log(Object.entries(allRooms))
    })
    const showRooms = async () => {
      let filtered = []
      let res = []

      await axios.get('http://localhost:3333/chat').then((v) => {
      res = v.data
      console.log(res, 'rees')
      })

      Object.entries(res).map((v) => {
        filtered.push(Object.entries(v[1]))
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
  <div className={style.modalListRooms}>
    <button onClick={() => showRooms()}> Ver quartos</button>
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

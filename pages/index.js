
import React, { useEffect, useState } from "react";
import axios from 'axios'

export default function Index() {
  const [allRooms, setAllRooms] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3333/chat').then((v) => {
      setAllRooms(v.data)
    })
    // console.log(Object.entries(allRooms))
  })
  const showRooms = () => {
    const filtered = []
    Object.entries(allRooms).map((v) => {
      filtered.push(Object.entries(v[1]))
    })
    setFilter(filtered)
    console.log(filtered)
  }
  return (
<div>
  <button onClick={() => showRooms()}> Ver quartos</button>
  {filter.map((item, key) => 
        <div style={{color: `white`}} key={key}>
          {item[1][1]}
        </div>)}
  </div>
  );
}

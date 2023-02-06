
import { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
  
export default function Color(props){
  const [color, setColor] = useColor("hex", "#121212"); 
  return (
    <div className="modal-color-picker" style={
                
                {
                  'display': props.open ? 'initial' : 'none',
                  'position': 'absolute',
                 'right': '22px',
                 'bottom': '4rem'}
                 
              }>

        <ColorPicker width={456} height={228} 
                   color={color} 
                   onChange={setColor} hideHSV dark />
    </div>
  )
};
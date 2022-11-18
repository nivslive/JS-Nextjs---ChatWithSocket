
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
  
export default function Color(){
  const [color, setColor] = useColor("hex", "#121212");
  
  return (
    <div style={
                
                {'position': 'absolute',
                 'right': '0',
                 'bottom': '10rem'}
                 
              }>

        <ColorPicker width={456} height={228} 
                   color={color} 
                   onChange={setColor} hideHSV dark />
    </div>
  )
};
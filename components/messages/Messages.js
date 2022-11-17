import socket from "../../pages/socketio";
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import style from "./Messages.module.css";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Color from "../ColorPicker/ColorPicker";
import jsonEmojis from "../../docs/emojis.json"

export default function Message(props) {
  const [message, setMessage] = useState("");
  const [animation] = useAutoAnimate()
  const [field, setField] = useState([]);
  const [emoji, setEmoji] = useState([])
  const [emojiName, setEmojiName] = useState([])
  const [color, setColor] = useState('')
  const [modalColor, setModalColor] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [created, setCreated] = useState(false);
  const emojiList = jsonEmojis.emojis
  let me = props.user;
  useEffect(() => {
    if(!created) {
      setCreated(true)
     /* const scripted = document.createElement("script");
      scripted.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
      document.body.appendChild(scripted);
      scripted.addEventListener("load", () => {
        $("#send").click(() => {
          setTimeout(() => {
            let scroll = $("#field").scrollTop();
            $("#field").scrollTop(scroll + 1080);
          }, 10);
        });
      });*/
    }

  });

  const changeMessage = (e) => {
    console.log(e.target.value)
    if(emojiName) {
      emojiName.map((v) => {
        if(e.target.value.match(`#${v}`)){
          setEmojiName([...emojiName, v])
        }
      })
    }

    setMessage(e.target.value);
  };
  const handleMessage = () => {
      socket.emit("channel", { message: message, user: me, emoji: emojiName, color: color });
      setMessage("");
      setEmojiName([]);
  };

  socket.on("message", (data) => {
    setField([...field, data]);
  });

  const Submit = (e) => {
    e.preventDefault();
    socket.emit("message", {
      user: props.user,
      mess: message,
    });
    e.target.reset();
  };
  const handleColor = (e) => { 
    try {
      document.querySelector('.rcp-fields').style.display = 'none'
      const item = document.querySelector('.rcp-fields-element-input')
      setColor(item.value)
    } catch(e) {

    }
    
  }

  return (
    <div className={style.main}>
      <div  ref={animation} className={style.fieldset} id="field"  style={{'background': darkMode ? 'transparent' : 'white'}}>
        {field.map((p, k) => {
          if (me.USER != p.user.USER) {
            return (
              <div className={style.other} key={k}>
                <div className={style.message_rec}>
                <p>
                  <strong>
                    {p.message}
                  </strong>

                  { 
                    p.emoji.map((v, key) =>  {  
                      return (<img key={key} className={style.emoji} src={`../emojis/${v}.png`} />) } 
                    )  
                  }
                </p>
                </div>
                <br />
                <div id={style.mess_reciever}>
                <a>{"@" + p.user.USER}</a>
                </div>
              </div>
            );
          } else {
            return (
              <div className={style.me} >
                <div  className={style.message_sent} style={{'background': `rgb(${p.color})`}}>
                  <p>

                    <strong className={`pr-3`}>
                      {p.message}
                    </strong>
                    { 
                      p.emoji.map((v, keyEmoji) =>  {  
                        return (<img key={keyEmoji} className={style.emoji} src={`../emojis/${v}.png`} />) } 
                      )  
                    }
                  </p>
                </div>
                <br />
                <div id={style.mess_sender}>
                  <img className={style.image_profile}
                  src={me.IMAGE_PROFILE} 
                  />
                  <a style={{'color': darkMode ? 'white' : 'black'}}>{"@" + me.USER}</a>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className={style.form_sender}>
          { modalColor && <Color onChange={e => setColor(e.target.value)}/>}
        <form onSubmit={Submit}>
          <input placeholder="Escreva o que está pensando. Mas cuidado pra não magoar ninguém." onChange={changeMessage} />
          <div style={{'background': `rgb(${color})`}} className={ emojiName.length !== 0 && style.emoji_bar}>
          { emojiName.map((v, key) => {
              return <img key={key} className={style.emoji} src={`../emojis/${v}.png`} />
            }) }

          </div>
          <div  style={{'position': 'absolute', 'top': '0',
        'width': '85px',
        'height': '85px',}}>
          <button  style={{'position': `relative`, 'width': '50px'}} className="systemMacroButton" onClick={() => {setDarkMode(!darkMode)}}>
              DARK MODE
          </button>
          <button   style={{'position': `relative`, 'width': '50px'}}  className="systemMacroButton" onClick={() => {window.location.reload()}}>
              Voltar
          </button>
          </div>

          <button
            style={{'background': `rgb(${color})`}}
            type="submit"
            className="btn btn-primary"

          >
            {
              emojiList.map((v, key) => {
                return (<img key={key} src={`../emojis/${v}.png`} className={style.emoji} onClick={() => {setEmoji(!emoji); setEmojiName(() => [...emojiName, v]); }}/>)
              })
            }
            <img onClick={() => {setModalColor(!modalColor)}} style={{'width': '20px', 'marginLeft': '10px'}} src="../icons/colorPicker.png" />
            { modalColor && <img onClick={handleColor} ref={animation} style={{'width': '30px'}} src="../icons/acceptColorPicker.png" /> }


            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              style={{'marginLeft': '20px'}}
              className="bi bi-chat-left-fill"
              viewBox="0 0 16 16"
            >
              <path id="send" onKeyPress={(event) => handleMessage(event)} onClick={handleMessage} d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

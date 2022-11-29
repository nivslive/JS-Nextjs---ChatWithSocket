import Image from 'next/image'
import Ably from '../../components/Ably/ReactComponent'
import React, { useState, useEffect } from "react";
import style from "./Messages.module.css";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Color from "../ColorPicker/ColorPicker";
import jsonEmojis from "../../docs/emojis.json"
import Favorite from "../Favorite/Favorite.jsx";
import dynamic from 'next/dynamic';

export default function Message(props) {
  const [message, setMessage] = useState("");
  const [animation] = useAutoAnimate()
  const [field, setField] = useState([]);
  const [emoji, setEmoji] = useState([])
  const [emojiName, setEmojiName] = useState([])
  const [color, setColor] = useState('')
  const [modalColor, setModalColor] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [response, setResponse] = useState([]);
  const [responseMessages, setResponseMessages] = useState([]);
  const [created, setCreated] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const emojiList = jsonEmojis.emojis
  let me = props.user;
  const cha = Ably.channels.get('event');
  const Logo = dynamic(() => import("../Logo/Logo"));
  useEffect(() => {
    if(!created) {
      console.log(props.response, 'responded')


      if(props.response) {
       setResponse([...response, props.response])
      }
      setCreated(true)
      if(props.response.messages !== null) {
        console.log(props.response.messages, 'oi?')
        const array = []
        array.push(props.response.messages)
        console.log(array)
        setResponseMessages(array);
        console.log(responseMessages, 'favorites')
      }

    /*  filtered.map(v => {
        v[6] = Object.entries(v[6])
      })

      filtered.map(v => {
        v[5][1] = v[5][1] !== null && Object.entries(v[5][1])
        v[6][1][1] = v[6][1][1] !== null && Object.entries(v[6][1][1])
      })*/

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
    
    // feature do #emoji capturado por #hashtags
    //emojiList.map((v) => {
    //  e.target.value === `#${v}` && setEmojiName([...emojiName, v])
    //})
    if(e.target.value === '#')
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
    cha.publish({ name: props.slug, data:{ message: message, user: me, emoji: emojiName, color: color }});
      setMessage("");
      document.querySelector('.input-send').value = ''
      setEmojiName([]);
  };

  cha.subscribe(props.slug, (data) => {
   setField([...field, data.data]);
   console.log(data.data, 'data?')
  });
  const Submit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  const handleColor = (e) => { 
    try {
      const item = document.querySelector('.rcp-fields-element-input')
      setColor(item.value)
    } catch(e) {

    }
    
  }

  const handleModalColor = () => {
    setModalColor(!modalColor)
    document.querySelector('.rcp-fields').style.display = 'none'
    // document.querySelector('.rcp-fields-element .hex-element').style.display = 'none'
  }

  const enterPressed = (e) => {
    if(message !== '') {
      e.key === 'Enter' && handleMessage()
    }

  }

  const darkModeRules = (e) => {
    setDarkMode(!darkMode)
  }

  const openMoreInfo = () => {
    document.querySelector('header').style.transition = '0.3s'
    document.querySelector('header').style.transform = !moreInfo ? 'translateY(0rem)' : 'translateY(-10rem)'
    setMoreInfo(!moreInfo)
  }

  return (
    <div className={style.main}>
      <div  ref={animation} className={style.fieldset} id="field" style={{'background': darkMode ? 'transparent' : 'white'}}>
        {field.map((p, k) => {
          if (me.USER != p.user.USER) {
            return (
              <div className={style.other} key={k}>
                <div className={style.message_rec} style={{'background': `rgb(${p.color})`}}>
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
                <div id={style.mess_sender}>
                  <Favorite />
                  <img className={style.image_profile}
                  src={p.user.IMAGE_PROFILE} 
                  />
                  <a style={{'color': darkMode ? 'white' : 'black'}}>{"@" + p.user.USER}</a>
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
                <Favorite />
                  <img className={style.image_profile}
                  src={p.user.IMAGE_PROFILE} 
                  />
                  <a style={{'color': darkMode ? 'white' : 'black'}}>{"@" + p.user.USER}</a>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div  
        style=
          {{'position': 'absolute', 'top': '16px',
          'display': 'flex',
          'marginLeft': !moreInfo ? 'auto' : 'initial', 
          'marginRight': 'auto'
          }}>
            <h5 className={style.littleLogo}> NEXUS </h5>
            <button   style={{'position': `relative`, 'width': '36px', 'height': '36px'}}  
                      className={style.systemMacroButton} 
                      onClick={() => {openMoreInfo()}}>
              {moreInfo ? `+` : '-'} 
            </button>

            <button   style={{'position': `relative`, 'width': '36px', 'height': '36px'}}  
                      className={style.systemMacroButton} 
                      onClick={() => {openAllRooms()}}>
              A
            </button>

            <button  style={{'position': `relative`, 'width': '36px', 'height': '36px'}} 
                     className={style.systemMacroButton} 
                     onClick={(e) => {darkModeRules(e);}}>
                D
            </button>

            <button  style={{'position': `relative`, 'width': '36px', 'height': '36px'}}  
                     className={style.systemMacroButton} 
                     onClick={() => {window.location.reload()}}>
                V
            </button>
            

      </div>

      <div className={style.form_sender}>
          <Color open={modalColor} onChange={e => setColor(e.target.value)}/>
        <form onSubmit={Submit}>
          <input placeholder="Escreva o que está pensando. Mas cuidado pra não magoar ninguém." className="input-send" onChange={changeMessage}  onKeyPress={enterPressed}  />
          <div style={{'background': `rgb(${color})`}} className={ emojiName.length !== 0 && style.emoji_bar}>
          { emojiName.map((v, key) => {
              return <img key={key} className={style.emoji} src={`../emojis/${v}.png`} />
            }) }

          </div>
          <button
            style={{'background': `rgb(${color})`}}
            className="btn btn-primary"
            onClick={e => e.preventDefault()}
          >
            {
              emojiList.map((v, key) => {
                return (<img key={key} src={`../emojis/${v}.png`} className={style.emoji} onClick={() => {setEmoji(!emoji); setEmojiName(() => [...emojiName, v]); }}/>)
              })
            }
            <img onClick={() => {handleModalColor()}} style={{'width': '20px', 'marginLeft': '10px'}} src="../icons/colorPicker.png" />
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
              <path id="send" onClick={handleMessage} d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

import Image from 'next/image'
import Ably from '../../server/server'
import React, { useState, useEffect } from "react";
import style from "./Messages.module.scss";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Color from "../ColorPicker/ColorPicker";
import jsonEmojis from "../../docs/emojis.json"
import Favorite from "../Chat/Favorite/Favorite.jsx";
import dynamic from 'next/dynamic';
import { faArrowLeft, faList, faInfo, faArrowUp, faFont } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Message(props: any) {
  const [message, setMessage] = useState("");
  const [animation] = useAutoAnimate()
  const [field, setField] = useState<any>([]);
  const [emoji, setEmoji] = useState<any>([])
  const [emojiName, setEmojiName] = useState<any>([])
  const [color, setColor] = useState<any>('')
  const [characterLength, setCharacterLength] = useState<any>(0);
  const [modalColor, setModalColor] = useState<any>(false);
  const [darkMode, setDarkMode] = useState<any>(true);
  const [allRooms, setAllRooms] = useState<any>(false);
  const [response, setResponse] = useState<any>([]);
  const [responseMessages, setResponseMessages] = useState<any>([]);
  const [created, setCreated] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const emojiList = jsonEmojis.emojis
  let me = props.user;
  const cha = Ably.channels.get('event');
  const List = dynamic(() => import("../List/List"));
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
    }

  });

  const changeMessage = (e: any) => {
    console.log(e.target.value.length)
    // feature do #emoji capturado por #hashtags
    //emojiList.map((v) => {
    //  e.target.value === `#${v}` && setEmojiName([...emojiName, v])
    //})
    if(e.target.value === '#')
    console.log(e.target.value)
    if(emojiName) {
      emojiName.map((v: any) => {
        if(e.target.value.match(`#${v}`)){
          setEmojiName([...emojiName, v])
        }
      })
    }
    if(e.target.value.length <= 144) {
      setCharacterLength(e.target.value.length)
      setMessage(e.target.value);
    } else {
      e.preventDefault()
    }
  };
  const handleMessage = () => {
    cha.publish({ name: props.slug, data:{ message: message, user: me, emoji: emojiName, color: color }});
      setMessage("");
      document.querySelector<any>('.input-send').value = ''
      // let messageList = document.querySelector('.fieldset')
      // messageList.scrollTop = messageList.scrollHeight;
      setEmojiName([]);
      setCharacterLength(0);
  };

  cha.subscribe(props.slug, (data: any) => {
   setField([...field, data.data]);
   console.log(data.data, 'data?')
  });
  const Submit = (e: any) => {
    e.preventDefault();
    e.target.reset();
  };
  const handleColor = (e:any) => { 
    try {
      const item = document.querySelector<any>('.rcp-fields-element-input')
      setColor(item.value)
    } catch(e) {

    }
    
  }

  const handleModalColor = () => {
    setModalColor(!modalColor)
    document.querySelector<any>('.rcp-fields').style.display = 'none'
    // document.querySelector('.rcp-fields-element .hex-element').style.display = 'none'
  }

  const enterPressed = (e:any) => {
    if(message !== '') {
      e.key === 'Enter' && handleMessage()
    }

  }

  const openAllRooms = () => {
    console.log(allRooms)
    // document.querySelector('.List_insideChat__wmLw_').setAttribute(`style`,       
    //  !allRooms ? 
    //  `transform: translate(-50%, 50%);` 
    //    :  
    //  `transform: translate(-50%,-50%)`, `!important` ) 
    setAllRooms(!allRooms)
    setTimeout(() => {
      document.querySelector<any>('.List_insideChat__wmLw_').style.transition = `2s`
      document.querySelector<any>('.List_insideChat__wmLw_').setAttribute(`style`,       
       allRooms ? 
        `transform: translate(-200%, -50%);` 
         :  
        `transform: translate(-50%,-50%)`, `!important` ) 

    }, 50
    )
    setMoreInfo(false)
  }

  const darkModeRules = (e:any) => {
    setDarkMode(!darkMode)
  }

  const openMoreInfo = () => {
    document.querySelector<any>('header').style.transition = '0.3s'
    document.querySelector<any>('header').style.transform = ! moreInfo ? 'translateY(0rem)' : 'translateY(-10rem)'
    setMoreInfo(!moreInfo)
    setAllRooms(false)
  }

  return (
    <div className={`${style.main}`}>
      <List listInsideChat={true} />
      <div  ref={animation} className={style.fieldset} id="field" style={{'background': darkMode ? 'transparent' : 'white'}}>
        {field.map((p: any, k:any) => {
          if (me.USER != p.user.USER) {
            return (
              <div className={style.other} key={k}>
                <div className={style.message_rec} style={{'background': `rgb(${p.color})`}}>
                <p>
                  <strong>
                    {p.message}
                  </strong>

                  { 
                    p.emoji.map((v:any, key:any) =>  {  
                      return (                  <Image 
                        width="200"
                        height="200"
                        key={key}
                        className={style.emoji}
                        alt="image profile"
                        src={`../emojis/${v}.png`}
                        />) } 
                    )  
                  }
                </p>
                </div>
                <br />
                <div id={style.mess_sender}>
                  <Favorite />

                  <Image
                  width="200"
                  height="200"
                  className={style.image_profile}
                  alt="image profile"
                  src={p.user.IMAGE_PROFILE}
                  />
                  <a style={{'color': darkMode ? 'white' : 'black'}}>{"@" + p.user.USER}</a>
                </div>
              </div>
            );
          } else {
            return (
              <div key={k} className={style.me} >
                <div className={style.message_sent} style={{'background': `rgb(${p.color})`}}>
                  <p>

                    <strong className={`pr-3`}>
                      {p.message}
                    </strong>
                    { 
                      p.emoji.map((v: any, keyEmoji: any) =>  {  
                        return (<Image width="200" height="200" alt="emoji" key={keyEmoji} className={style.emoji} src={`/emojis/${v}.png`} />) } 
                      )  
                    }
                    <Favorite />
                  </p>
                </div>
                <br />
                <div id={style.mess_sender}>
                <Image
                  width="200" height="200"
                  className={style.image_profile}
                  src={p.user.IMAGE_PROFILE}
                  alt="profile image"
                />
                  <a style={{'color': darkMode ? 'white' : 'black'}}>{"@" + p.user.USER}</a>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div
        className="d-flex w-100 align-items-center justify-content-between px-3"  
        style=
          {{'position': 'absolute', 'top': '16px',
          'display': 'flex',
          'marginLeft': !moreInfo ? 'auto' : 'initial', 
          'marginRight': 'auto',
          'zIndex': '9999'
          }}>
          <div className="pl-md-3 d-flex align-items-center justify-content-center">

            <div className={`${style.logoBox} d-flex justify-content-center align-items-center`}>
              <h5 className={`${style.littleLogo}`}> yorus.club </h5> 
              <Image width="200" height="200" alt="logo icon" className={style.logoIcon} src="/icon.png"/>
            </div>

            <button   style={{'position': `relative`, 'width': '36px', 'height': '36px'}}  
                      className={style.systemMacroButton} 
                      onClick={() => {openMoreInfo()}}>
             <FontAwesomeIcon icon={!moreInfo ? faInfo : faArrowUp} />

            </button>

            <button   style={{'position': `relative`, 'width': '36px', 'height': '36px'}}  
                      className={style.systemMacroButton} 
                      onClick={() => {openAllRooms()}}>
              <FontAwesomeIcon icon={faList} />
            </button>
            { characterLength !== 0 && 
            
            <p className="text-white my-auto">
              { characterLength +  `/144 ` }               
            <FontAwesomeIcon icon={faFont} />
            </p> 
            
            }

          </div>

          <div className="pr-md-3 d-flex">


          <button  style={{'position': `relative`, 'width': '36px', 'height': '36px'}}  
                     className={style.systemMacroButton} 
                     onClick={() => {window.location.reload()}}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

          </div>
        
      </div>

      <div className={style.form_sender}>

          <Color open={modalColor} onChange={(e:any) => setColor(e.target.value)}/>
        <form onSubmit={Submit}>
          
          <input placeholder="Escreva o que está pensando. Mas cuidado pra não magoar ninguém." className="input-send" onChange={changeMessage}  onKeyPress={enterPressed}  />
          <div style={{'background': `rgb(${color})`}} className={ emojiName.length !== 0 ? style.emoji_bar : ''}>
          { emojiName.map((v: any, key: any) => {
              return <Image width="200" height="200" alt="emoji" key={key} className={style.emoji} src={`/emojis/${v}.png`} />
            }) }

          </div>
          <button
            style={{'background': `rgb(${color})`}}
            className="btn btn-primary"
            onClick={e => e.preventDefault()}
          >
            {
              emojiList.map((v, key) => {
                return (<Image width="200" height="200" alt="set emoji" key={key} src={`/emojis/${v}.png`} className={style.emoji} onClick={() => {setEmoji(!emoji); setEmojiName(() => [...emojiName, v]); }}/>)
              })
            }
            <Image width="30" height="20" alt="color picker icon" onClick={() => {handleModalColor()}} style={{'width': '20px', 'marginLeft': '10px'}} src="/icons/colorPicker.png" />
            { modalColor && <Image width="30" height="30" alt="accept color picker" onClick={handleColor} ref={animation} src="/icons/acceptColorPicker.png" /> }


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

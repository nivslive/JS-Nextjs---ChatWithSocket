import Image from 'next/image';
import React from 'react';
import Favorite from '../../Favorite/Favorite';

export default function Me() {
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
    )
}
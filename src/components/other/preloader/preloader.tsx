import loadBar from './../../../img/loading.svg'
import React from 'react';
import s from './preloader.module.scss'


const Preloader = () => {
   return (
      <div className={s.container}>
         <img src={loadBar} />
      </div>
   )
}

export default Preloader;
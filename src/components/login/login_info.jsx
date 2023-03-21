import { useState } from 'react';
import React from 'react';
import LoginContainer from './LoginContainer';
import s from './loginInfo.module.scss'

const LoginInfo = () => {
   // const [active, setActive] = useState(false)
   return (
      <div className={s.wrapper}>
         <p className={s.wrapper_p}>To view this page you must log in or sign up</p>
         {/* <div className={s.content}>
            <button className={s.login_button} onClick={() => setActive(true)}>Login</button>
         </div>
         <LoginContainer active={active} setActive={setActive} /> */}
      </div>
   )
}

export default LoginInfo
import s from './header.module.scss'
import logo from './../../img/logo.jfif'
import userPhoto from './../../img/ava.jpg'
import { useState } from 'react'
import LoginContainer from '../login/LoginContainer'
import Menu from '../burger/Menu'
import Preloader from '../other/preloader/preloader'

const Header = (props) => {
  const [active, setActive] = useState(false)

  if (props.isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.body}>
      <div className={s.header}>
        <img className={s.logo} src={logo} alt="#"></img>
        <div className={s.login_block}>
          {props.isAuth ?
            <div className={s.login_line}>
              <span className={s.login}> {props.login} </span>
              <div className={s.user_photo}>
                <img className={s.photo} src={props.photoSmall != null ? props.photoSmall : userPhoto} alt=""></img>
              </div>
              <button className={`${s.login_link} ${s.logout_link}`} onClick={props.logOutTC}>LogOut</button>
            </div> :
            <span className={s.login_link} onClick={() => setActive(true)}>login</span>}
        </div>
      </div>
      <LoginContainer active={active} setActive={setActive} />
      <Menu />
    </div>
  )
}

export default Header;
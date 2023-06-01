import s from './header.module.scss'
import logo from './../../img/logo.jfif'
import userPhoto from './../../img/ava.jpg'
import { useState } from 'react'
import Menu from '../burger/Menu'
import Preloader from '../other/preloader/preloader'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { logOutTC, ThunkAuthType } from '../../redux/authReducer'
import { AnyAction } from 'redux'
import { getAuth, getIsLoading, getLogin, getPhotoSmall } from '../../redux/authSelector'
import Login from '../login/login'


const Header: React.FC = (props) => {

  const isAuth = useSelector(getAuth)
  const photoSmall = useSelector(getPhotoSmall)
  const isLoading = useSelector(getIsLoading)
  const login = useSelector(getLogin)

  const dispatch = useDispatch()

  const logOut = () => {
    const action = logOutTC()
    dispatch(action as ThunkAuthType & AnyAction);
  }

  const [active, setActive] = useState<boolean>(false)

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.body}>
      <div className={s.header}>
        <img className={s.logo} src={logo} alt="#"></img>
        <div className={s.login_block}>
          {isAuth ?
            <div className={s.login_line}>
              <span className={s.login}> {login} </span>
              <div className={s.user_photo}>
                <img className={s.photo} src={photoSmall != null ? photoSmall : userPhoto} alt=""></img>
              </div>
              <button className={`${s.login_link} ${s.logout_link}`} onClick={logOut}>LogOut</button>
            </div> :
            <span className={s.login_link} onClick={() => setActive(true)}>login</span>}
        </div>
      </div>
      <Login active={active} setActive={setActive} />
      <Menu />
    </div>
  )
}

export default Header;
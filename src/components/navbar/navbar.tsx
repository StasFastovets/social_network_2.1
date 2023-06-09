import { NavLink } from 'react-router-dom';
import s from './navbar.module.scss';
import cn from 'classnames'

type NavLinkProps = {
   isActive?: boolean;
   isPending?: boolean;
}

const Navigation = () => {
   let style = (data: NavLinkProps) => data.isActive ? cn(s.link, s.active) : s.link
   return (
      <nav className={s.navigation}>
         <ul>
            <li><NavLink className={style} to="/profile">Profile</NavLink></li>
            <li><NavLink className={style} to="/dialogs">Messages</NavLink></li>
            <li><NavLink className={style} to="/news">News</NavLink></li>
            <li><NavLink className={style} to="/music">Music</NavLink></li>
            <li><NavLink className={style} to="/users">Users</NavLink></li>
            <li><NavLink className={style} to="/chat">Chat</NavLink></li>
            <li><NavLink className={style} to="/settings">Settings</NavLink></li>
            <li><NavLink className={style} to="/">Home</NavLink></li>
         </ul>
      </nav >
   )
}

export default Navigation;
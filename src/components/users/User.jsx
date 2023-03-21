import React from 'react';
import s from './users.module.scss';
import usersPhoto from "../../img/images.jfif";
import { NavLink } from 'react-router-dom';


const User = ({ user, followUnfollowUserTC, followingInProgress }) => {
   return (
      <div className={s.user} key={user.id}>
         <div className={s.info}>
            <NavLink to={'/profile/' + user.id}>
               <img src={user.photos.small != null ? user.photos.small : usersPhoto} alt="smile" className={s.img}></img>
            </NavLink>
            {user.followed ?
               <button disabled={followingInProgress.some(id => id === user.id)} className={s.button}
                  onClick={() => { followUnfollowUserTC(user.id, false) }}
               >FOLLOW</button> :
               <button disabled={followingInProgress.some(id => id === user.id)} className={s.button}
                  onClick={() => { followUnfollowUserTC(user.id, true) }}
               >UNFOLLOW</button>}
         </div>
         <div className={s.text}>
            <div className={s.text_left}>
               <div className={s.name}>{user.name}</div>
               <div className={s.status}>{user.status}</div>
            </div>
            <div className={s.text_right}>
               <div className={s.country}>{'user.location.country'}</div>
               <div className={s.city}>{'user.location.city'}</div>
            </div>
         </div>
      </div>)
}



export default User;


import React from 'react';
import s from './users.module.scss';
import usersPhoto from "../../img/images.jfif";
import { NavLink } from 'react-router-dom';
import { followUnfollowUserTC, ThunkUsersType, UserType } from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getfollowingInProgress } from './../../redux/users_selectors';
import { AnyAction } from 'redux';


type PropsType = {
   user: UserType
}

const User: React.FC<PropsType> = ({ user }) => {

   const followingInProgress = useSelector(getfollowingInProgress)

   const dispatch = useDispatch()

   const followUnfollowUser = (id: number, follow: boolean) => {
      const action = followUnfollowUserTC(id, follow);
      dispatch(action as ThunkUsersType & AnyAction);
   }

   return (
      <div className={s.user} key={user.id}>
         <div className={s.info}>
            <NavLink to={'/profile/' + user.id}>
               <img src={user.photos.small != null ? user.photos.small : usersPhoto} alt="smile" className={s.img}></img>
            </NavLink>
            {user.followed ?
               <button disabled={followingInProgress.some(id => id === user.id)} className={s.button}
                  onClick={() => { followUnfollowUser(user.id, false) }}
               >UNFOLLOW</button> :
               <button disabled={followingInProgress.some(id => id === user.id)} className={s.button}
                  onClick={() => { followUnfollowUser(user.id, true) }}
               >FOLLOW</button>}
         </div>
         <div className={s.text}>
            <div className={s.name}>{user.name}</div>
            <div className={s.status}>{user.status}</div>
            <div className={s.country}>{'user.location.country'}</div>
            <div className={s.city}>{'user.location.city'}</div>
         </div>
      </div>)
}


export default User;


import React from 'react';
import s from './users.module.scss';
import Preloader from '../other/preloader/preloader'
import Paginator from '../other/paginator/Paginator';
import User from './User';
import { UserType } from '../../redux/usersReducer';

type PropsType = {
   users: UserType[]
   currentPage: number
   isFetching: boolean
   totalUsersCount: number
   portionSize: number
   pageSize: number
   portionNumber: number
   onPageChanget: (pageNumber: number, portionNumber: number) => void
   followUnfollowUserTC: (id: number, follow: boolean) => void
   followingInProgress: number[]
}

const Users: React.FC<PropsType> = ({ users, ...props }) => {
   return (
      <div className={s.body} key={props.currentPage}>
         <div className={s.container}>
            <div className={s.caption}>Users</div>
            <div className={s.loader}>{props.isFetching ? <Preloader /> : null}</div>
            <Paginator {...props} />
            <div className={s.users}>
               {
                  users.map(user => <User {...props} user={user} key={user.id} />)
               }
            </div>
         </div>
      </div >
   )
}



export default Users;


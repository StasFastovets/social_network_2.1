import React from 'react';
import s from './users.module.scss';
import Preloader from './../other/preloader/preloader'
import Paginator from '../other/paginator/Paginator';
import User from './User';


const Users = ({ users, ...props }) => {
   return (
      <div className={s.body} key={props.currentPage}>
         <div className={s.container}>
            <div className={s.caption}>Users</div>
            <div className={s.loader}>{props.isFetching ? <Preloader /> : null}</div>
            <Paginator {...props} />
            <div className={s.users}>
               {
                  users.map(user => <User {...props} user={user} />)
               }
            </div>
         </div>
      </div >
   )
}



export default Users;


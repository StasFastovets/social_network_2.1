import React, { useEffect } from 'react';
import s from './users.module.scss';
import Preloader from '../other/preloader/preloader'
import Paginator from '../other/paginator/Paginator';
import User from './User';
import { FilterType, getUsersTC, ThunkUsersType, UserType } from '../../redux/usersReducer';
import UserSearchForm from './UsersSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFilteredUsers, getIsFetching, getPageSize, getUsers } from '../../redux/users_selectors';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';


const Users: React.FC = (props) => {

   const users = useSelector(getUsers)
   const currentPage = useSelector(getCurrentPage)
   const isFetching = useSelector(getIsFetching)
   const pageSize = useSelector(getPageSize)
   const filter = useSelector(getFilteredUsers)

   const dispatch = useDispatch()

   const [searchParams, setSearchParams] = useSearchParams()
   const term = searchParams.get('term') || '';
   const friend = searchParams.get('friend') || '';
   const page = searchParams.get('page') || '';


   useEffect(() => {
      let actualTerm 
      let actualFriend: null | boolean = null
      let actualPage

      term.length ? actualTerm = term : actualTerm = filter.term
      friend.length ? friend == 'true' ? actualFriend = true : actualFriend = false : actualFriend = filter.friend

      const action = getUsersTC(currentPage, pageSize, actualTerm, actualFriend)
      dispatch(action as ThunkUsersType & AnyAction)
   }, [])

   useEffect(() => {

      setSearchParams({
         term: filter.term,
         friend: filter.friend !== null ? filter.friend.toString() : '',
         page: currentPage.toString()
      })

   }, [filter, currentPage])

   return (
      <div className={s.body} key={currentPage}>
         <div className={s.container}>
            <div className={s.caption}>Users</div>
            <div className={s.search__form}>
               <UserSearchForm term={term} friend={friend} setSearchParams={setSearchParams} />
            </div>
            <div className={s.loader}>{isFetching ? <Preloader /> : null}</div>
            <Paginator />
            <div className={s.users}>
               {
                  users.map(user => <User user={user} key={user.id} />)
               }
            </div>
         </div>
      </div >
   )
}



export default Users;


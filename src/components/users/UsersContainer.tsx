import React from 'react';
import { connect } from 'react-redux';
import { actionsUsers } from '../../redux/usersReducer';
import Users from './Users';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getfollowingInProgress, getCurrentUsers, getPortionSize } from '../../redux/users_selectors';
import { useEffect } from 'react';
import { followUnfollowUserTC, getUsersTC } from '../../redux/usersReducer';
import { UserType } from '../../redux/usersReducer';
import { AppStateType } from '../../redux/redux';

// type MapStatePropsType = {
//    users: UserType[]
//    currentPage: number
//    isFetching: boolean
//    totalUsersCount: number
//    portionSize: number
//    pageSize: number
//    portionNumber: number
//    followingInProgress: number[]
// }

type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
   setCurrentPage: (page: number) => void,
   setPortionNumber: (portionNumber: number) => void
   followUnfollowUserTC: (id: number, follow: boolean) => void,
   getUsersTC: (currentPage: number, pageSize: number) => void,
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UsersAPIContainer: React.FC<PropsType> = ({ getUsersTC, setCurrentPage, setPortionNumber, ...props }) => {
   useEffect(() => {
      return getUsersTC(props.currentPage, props.pageSize)
   }, [])

   const onPageChanget = (page: number, portionNumber: number) => {
      setCurrentPage(page)
      setPortionNumber(portionNumber)
      getUsersTC(page, props.pageSize)
   }

   return (
      <Users {...props} onPageChanget={onPageChanget} />
   )
}

let mapStateToProps = (state: AppStateType) => {
   return {
      users: getCurrentUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getfollowingInProgress(state),
      portionSize: getPortionSize(state),
      portionNumber: state.users.portionNumber
   }
}


// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState - должна быть именно такая последовательностьтзь
const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
   mapStateToProps, { followUnfollowUserTC, getUsersTC, setCurrentPage: actionsUsers.setCurrentPage, setPortionNumber: actionsUsers.setPortionNumber })(UsersAPIContainer)

export default UsersContainer



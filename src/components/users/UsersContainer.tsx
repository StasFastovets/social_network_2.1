import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, getUsersTC } from '../../redux/usersReducer';
import Users from './Users';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getfollowingInProgress, getCurrentUsers, getPortionSize } from '../../redux/users_selectors';
import { useEffect } from 'react';
import { followUnfollowUserTC } from '../../redux/usersReducer';
import { setPortionNumber } from '../../redux/usersReducer';
import { UserType } from '../../redux/usersReducer';
import { AppStateType } from '../../redux/redux';

type MapStatePropsType = {
   users: UserType[]
   currentPage: number
   isFetching: boolean
   totalUsersCount: number
   portionSize: number
   pageSize: number
   portionNumber: number
   followingInProgress: number[]
}

type MapDispatchPropsType = {
   followUnfollowUserTC: (id: number, follow: boolean) => void
   setCurrentPage: (page: number) => void
   getUsersTC: (currentPage: number, pageSize: number) => void
   setPortionNumber: (portionNumber: number) => void
}

type OwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
   mapStateToProps, { followUnfollowUserTC, setCurrentPage, getUsersTC, setPortionNumber })(UsersAPIContainer)

export default UsersContainer



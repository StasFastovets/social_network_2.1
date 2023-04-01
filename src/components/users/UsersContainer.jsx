import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, getUsersTC } from '../../redux/usersReducer';
import Users from './Users';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getfollowingInProgress, getUsers, getPortionSize } from './../../redux/users_selectors';
import { useEffect } from 'react';
import { followUnfollowUserTC } from './../../redux/usersReducer';
import { setPortionNumber } from '../../redux/usersReducer';


const UsersAPIContainer = ({ getUsersTC, setCurrentPage, setPortionNumber, ...props }) => {
   useEffect(() => {
      return getUsersTC(props.currentPage, props.pageSize)
   }, [])

   const onPageChanget = (page, portionNumber) => {
      setCurrentPage(page)
      setPortionNumber(portionNumber)
      getUsersTC(page, props.pageSize)
   }

   return (
      <Users {...props} onPageChanget={onPageChanget} />
   )
}

let mapStateToProps = (state) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getfollowingInProgress(state),
      portionSize: getPortionSize(state),
      portionNumber: state.users.portionNumber
   }
}

const UsersContainer = connect(mapStateToProps, { followUnfollowUserTC, setCurrentPage, getUsersTC, setPortionNumber })(UsersAPIContainer)

export default UsersContainer



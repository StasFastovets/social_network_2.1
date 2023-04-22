import {AppStateType} from './redux'

// import { createSelector } from 'reselect';
// export const getUsersSuperSelector = createSelector(getUsers, (users) => {
//    return users.filter(user => true)
// })


export const getCurrentUsers = (state: AppStateType) => {
   return state.users.users
}

export const getPageSize = (state: AppStateType) => {
   return state.users.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
   return state.users.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
   return state.users.currentPage
}

export const getIsFetching = (state: AppStateType) => {
   return state.users.isFetching
}

export const getfollowingInProgress = (state: AppStateType) => {
   return state.users.followingInProgress
}

export const getPortionSize = (state: AppStateType) => {
   return state.users.portionSize
}
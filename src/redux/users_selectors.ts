import { AppStateType } from './redux'
import { createSelector } from 'reselect';

// import { createSelector } from 'reselect';
// export const getUsersSuperSelector = createSelector(getUsers, (users) => {
//    return users.filter(user => true)
// })


// export const getUsers = (state: AppStateType) => {
//    return state.users.users
// }

export const getUsers = createSelector(
   (state: AppStateType) => state.users.users,
   (users) => users);

export const getPageSizeSelector = (state: AppStateType) => {
   return state.users.pageSize
}

export const getPageSize = createSelector(
   getPageSizeSelector,
   (pageSize) => pageSize
);

export const getTotalUsersCountSelector = (state: AppStateType) => {
   return state.users.totalUsersCount
}

export const getTotalUsersCount = createSelector(
   getTotalUsersCountSelector,
   (totalUsersCount) => totalUsersCount
);

export const getCurrentPageSelector = (state: AppStateType) => {
   return state.users.currentPage
}

export const getCurrentPage = createSelector(
   getCurrentPageSelector,
   (currentPage) => currentPage
);

export const getIsFetchingSelector = (state: AppStateType) => {
   return state.users.isFetching
}

export const getIsFetching = createSelector(
   getIsFetchingSelector,
   (isFetching) => isFetching
);

export const getfollowingInProgressSelector = (state: AppStateType) => {
   return state.users.followingInProgress
}

export const getfollowingInProgress = createSelector(
   getfollowingInProgressSelector,
   (followingInProgress) => followingInProgress
);

export const getPortionSizeSelector = (state: AppStateType) => {
   return state.users.portionSize
}

export const getPortionSize = createSelector(
   getPortionSizeSelector,
   (portionSize) => portionSize
);


export const getFilteredUsersSelector = (state: AppStateType) => {
   return state.users.filter
}

export const getFilteredUsers = createSelector(
   getFilteredUsersSelector,
   (filter) => filter
);

export const getPortionNumberSelector = (state: AppStateType) => {
   return state.users.portionNumber
}

export const getPortionNumber = createSelector(
   getPortionNumberSelector,
   (portionNumber) => portionNumber
);
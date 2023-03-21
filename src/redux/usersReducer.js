import { unfollowUser, getUsers, followUser } from './../API/api';

const FOLLOW_UNFOLLOW = 'users/FOLLOW_UNFOLLOW'
const SET_USERS = 'users/SET_USER'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_ALL_USERS = 'users/SET_ALL_USERS'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
   users: [],
   pageSize: 100,                 // количество пользователей на странице
   totalUsersCount: 0,            // количество всех пользователей, приходят из сервера 
   currentPage: 1,                // текущая страница
   isFetching: false,             // отображение полосы загрузки
   followingInProgress: [],       // 
   portionSize: 10,               // количество порций(страничек)
}

const usersReducer = (state = initialState, action) => {

   switch (action.type) {
      case FOLLOW_UNFOLLOW:
         return {
            ...state,
            users: state.users.map(item => {
               if (item.id === action.userID) {
                  return { ...item, followed: action.isSwitch ? true : false }
               }
               return item
            })
         }
      case SET_USERS:
         return { ...state, users: [...action.users] }
      case SET_CURRENT_PAGE:
         return { ...state, currentPage: action.page }
      case SET_ALL_USERS:
         return { ...state, totalUsersCount: action.users }
      case TOGGLE_IS_FETCHING:
         return { ...state, isFetching: action.isFetching }
      case TOGGLE_IS_FOLLOWING_PROGRESS:
         return {
            ...state,
            followingInProgress: action.isFetching ?
               [...state.followingInProgress, action.userID] :
               state.followingInProgress.filter(id => id != action.userID)
         }
      default:
         return state
   }
}


export const followUnfollowUsers = (userID, isSwitch) => ({ type: FOLLOW_UNFOLLOW, userID, isSwitch })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page: page })
export const setAllUsers = (users) => ({ type: SET_ALL_USERS, users })
export const setIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID })


export const getUsersTC = (currentPage, pageSize) => {
   return (
      (dispatch) => {
         dispatch(setIsFetching(true))
         getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setAllUsers(data.totalCount))
            dispatch(setIsFetching(false))
         })
      }
   )
}

export const followUnfollowUserTC = (userID, follow) => {
   return (
      (dispatch) => {
         dispatch(toggleFollowingProgress(true, userID))
         const apiCall = follow ? followUser : unfollowUser;
         apiCall(userID).then(data => {
            if (data.resultCode === 0) {
               follow ? dispatch(followUnfollowUsers(userID, true)) : dispatch(followUnfollowUsers(userID, false))
            }
            dispatch(toggleFollowingProgress(false, userID))
         })
      }
   )
}

export default usersReducer
 
import { unfollowUser, getUsers, followUser } from '../API/api';
import { InitialStateProfilePhotosType } from './authReducer';

const FOLLOW_UNFOLLOW = 'users/FOLLOW_UNFOLLOW'
const SET_USERS = 'users/SET_USER'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_ALL_USERS = 'users/SET_ALL_USERS'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_PORTION_NUMBER = 'users/SET_PORTION_NUMBER'

export type UserType = {
   id: number,
   name: string,
   status: string | null,
   followed: boolean,
   photos: InitialStateProfilePhotosType
}

export type InitialStateType = {
   users: UserType[],
   pageSize: number,
   totalUsersCount: number,
   currentPage: number,
   isFetching: boolean,
   followingInProgress: number[],
   portionSize: number,
   portionNumber: number,
}

let initialState: InitialStateType = {
   users: [],
   pageSize: 100,                 // количество пользователей на странице
   totalUsersCount: 0,            // количество всех пользователей, приходят из сервера 
   currentPage: 1,                // текущая страница
   isFetching: false,             // отображение полосы загрузки
   followingInProgress: [],       // 
   portionSize: 10,               // количество порций(страничек)
   portionNumber: 1
}

const usersReducer = (state = initialState, action: any): InitialStateType => {

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
      case SET_PORTION_NUMBER:
         return { ...state, portionNumber: action.portionNumber }
      default:
         return state
   }
}

type FollowUnfollowUsersACType = {
   type: typeof FOLLOW_UNFOLLOW,
   userID: number,
   isSwitch: boolean
}
export const followUnfollowUsers = (userID: number, isSwitch: boolean): FollowUnfollowUsersACType => ({ type: FOLLOW_UNFOLLOW, userID, isSwitch })

type SetUsersACType = {
   type: typeof SET_USERS,
   users: UserType[]
}
export const setUsers = (users: UserType[]): SetUsersACType => ({ type: SET_USERS, users })

type SetCurrentPageACType = {
   type: typeof SET_CURRENT_PAGE,
   page: number
}
export const setCurrentPage = (page: number): SetCurrentPageACType => ({ type: SET_CURRENT_PAGE, page: page })

type SetAllUsersACType = {
   type: typeof SET_ALL_USERS,
   users: number
}
export const setAllUsers = (users: number): SetAllUsersACType => ({ type: SET_ALL_USERS, users })

type SetIsFetchingACType = {
   type: typeof TOGGLE_IS_FETCHING,
   isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingACType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressACType = {
   type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
   isFetching: boolean,
   userID: number
}
export const toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressACType =>
   ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID })

type SetPortionNumberACType = {
   type: typeof SET_PORTION_NUMBER,
   portionNumber: number
}
export const setPortionNumber = (portionNumber: number): SetPortionNumberACType => ({ type: SET_PORTION_NUMBER, portionNumber })


export const getUsersTC = (currentPage: number, pageSize: number) => {
   return (
      (dispatch: any) => {
         dispatch(setIsFetching(true))
         getUsers(currentPage, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setAllUsers(data.totalCount))
            dispatch(setIsFetching(false))
         })
      }
   )
}


export const followUnfollowUserTC = (userID: number, follow: boolean) => async (dispatch: any) => {
   dispatch(toggleFollowingProgress(true, userID))
   const apiCall = follow ? followUser : unfollowUser;
   const response = await apiCall(userID)
   if (response.resultCode === 0) {
      follow ? dispatch(followUnfollowUsers(userID, true)) : dispatch(followUnfollowUsers(userID, false))
   }
   dispatch(toggleFollowingProgress(false, userID))
}

export default usersReducer

import { ThunkAction } from 'redux-thunk';
import { unfollowUser, getUsers, followUser, ResultCode } from '../API/api';
import { PhotosType } from './authReducer';
import { AppStateType } from './redux';


export type UserType = {
   id: number,
   name: string,
   status: string | null,
   followed: boolean,
   photos: PhotosType
}

let initialState = {
   users: [] as Array<UserType>,
   pageSize: 100,                                  // количество пользователей на странице
   totalUsersCount: 0,                             // количество всех пользователей, приходят из сервера 
   currentPage: 1,                                 // текущая страница
   isFetching: false,                              // отображение полосы загрузки
   followingInProgress: [] as Array<number>,       // 
   portionSize: 10,                                // количество порций(страничек)
   portionNumber: 1
}

type StateType = typeof initialState

type ActionsTypes = ReturnType<typeof followUnfollowUsers> |
   ReturnType<typeof setUsers> |
   ReturnType<typeof setCurrentPage> |
   ReturnType<typeof setAllUsers> |
   ReturnType<typeof setIsFetching> |
   ReturnType<typeof toggleFollowingProgress> |
   ReturnType<typeof setPortionNumber>

const usersReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {

   switch (action.type) {
      case 'users/FOLLOW_UNFOLLOW':
         return {
            ...state,
            users: state.users.map(item => {
               if (item.id === action.userID) {
                  return { ...item, followed: action.isSwitch ? true : false }
               }
               return item
            })
         }
      case 'users/SET_USER':
         return { ...state, users: [...action.users] }
      case 'users/SET_CURRENT_PAGE':
         return { ...state, currentPage: action.page }
      case 'users/SET_ALL_USERS':
         return { ...state, totalUsersCount: action.usersCount }
      case 'users/TOGGLE_IS_FETCHING':
         return { ...state, isFetching: action.isFetching }
      case 'users/TOGGLE_IS_FOLLOWING_PROGRESS':
         return {
            ...state,
            followingInProgress: action.isFetching ?
               [...state.followingInProgress, action.userID] :
               state.followingInProgress.filter(id => id != action.userID)
         }
      case 'users/SET_PORTION_NUMBER':
         return { ...state, portionNumber: action.portionNumber }
      default:
         return state
   }
}
/////////////////////////////////////////////////////////////////////
export const followUnfollowUsers = (userID: number, isSwitch: boolean) => ({ type: 'users/FOLLOW_UNFOLLOW', userID, isSwitch } as const)
export const setUsers = (users: UserType[]) => ({ type: 'users/SET_USER', users } as const)
export const setCurrentPage = (page: number) => ({ type: 'users/SET_CURRENT_PAGE', page: page } as const)
export const setAllUsers = (usersCount: number) => ({ type: 'users/SET_ALL_USERS', usersCount } as const)
export const setIsFetching = (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const)
export const toggleFollowingProgress = (isFetching: boolean, userID: number) =>
   ({ type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const)
export const setPortionNumber = (portionNumber: number) => ({ type: 'users/SET_PORTION_NUMBER', portionNumber } as const)
///////////////////////////////////////////////////////////////////////////////

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsersTC = (currentPage: number, pageSize: number): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
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

export const followUnfollowUserTC = (userID: number, follow: boolean): ThunkType => async (dispatch) => {
   dispatch(toggleFollowingProgress(true, userID))
   const apiCall = follow ? followUser : unfollowUser;
   const response = await apiCall(userID)
   if (response.resultCode === ResultCode.Success) {
      follow ? dispatch(followUnfollowUsers(userID, true)) : dispatch(followUnfollowUsers(userID, false))
   }
   dispatch(toggleFollowingProgress(false, userID))
}

export default usersReducer

import { ThunkAction } from 'redux-thunk';
import { unfollowUser, getUsers, followUser, ResultCode } from '../API/api';
import { PhotosType } from './authReducer';
import { AppStateType, BaseThunkType, PropertiesTypes } from './redux';


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
   portionNumber: 1,
   filter: {
      term: '',
      friend: null as null | boolean
   }
}

export type FilterType = typeof initialState.filter

type StateType = typeof initialState

export const actionsUsers = {
   followUnfollowUsers: (userID: number, isSwitch: boolean) => ({ type: 'users/FOLLOW_UNFOLLOW', userID, isSwitch } as const),
   setUsers: (users: UserType[]) => ({ type: 'users/SET_USER', users } as const),
   setFilter: (filter: FilterType) => ({ type: 'users/SET_FILTER', payload: filter } as const),
   setCurrentPage: (page: number) => ({ type: 'users/SET_CURRENT_PAGE', page: page } as const),
   setAllUsers: (usersCount: number) => ({ type: 'users/SET_ALL_USERS', usersCount } as const),
   setIsFetching: (isFetching: boolean) => ({ type: 'users/TOGGLE_IS_FETCHING', isFetching } as const),
   toggleFollowingProgress: (isFetching: boolean, userID: number) =>
      ({ type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const),
   setPortionNumber: (portionNumber: number) => ({ type: 'users/SET_PORTION_NUMBER', portionNumber } as const),
}

type ActionsType = ReturnType<PropertiesTypes<typeof actionsUsers>>

const usersReducer = (state: StateType = initialState, action: ActionsType): StateType => {

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
      case 'users/SET_FILTER':
         return { ...state, filter: action.payload }
      default:
         return state
   }
}


type ThunkType = BaseThunkType<ActionsType>

export const getUsersTC = (currentPage: number, pageSize: number, filter: FilterType): ThunkAction<void, AppStateType, unknown, ActionsType> => {
   return (
      (dispatch) => {
         dispatch(actionsUsers.setIsFetching(true))
         // dispatch(actionsUsers.setCurrentPage(currentPage))
         dispatch(actionsUsers.setFilter(filter))
         getUsers(currentPage, pageSize, filter.term, filter.friend).then(data => {
            dispatch(actionsUsers.setUsers(data.items))
            dispatch(actionsUsers.setAllUsers(data.totalCount))
            dispatch(actionsUsers.setIsFetching(false))
         })
      }
   )
}

export const followUnfollowUserTC = (userID: number, follow: boolean): ThunkType => async (dispatch) => {
   dispatch(actionsUsers.toggleFollowingProgress(true, userID))
   const apiCall = follow ? followUser : unfollowUser;
   const response = await apiCall(userID)
   if (response.resultCode === ResultCode.Success) {
      follow ? dispatch(actionsUsers.followUnfollowUsers(userID, true)) : dispatch(actionsUsers.followUnfollowUsers(userID, false))
   }
   dispatch(actionsUsers.toggleFollowingProgress(false, userID))
}

export default usersReducer

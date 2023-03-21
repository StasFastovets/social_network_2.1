import { getUser, updateStatusOfUser } from "../API/api"
import { getStatusOfUser } from './../API/api';

const SET_USER = 'profile/SET_USER'
const SET_STATUS = 'profile/SET_STATUS'
const IS_LOADING = 'profile/IS_LOADING'
const SET_PHOTOS = 'profile/SET_PHOTOS'

let initialState = {
   profile: {
      photos: {
         small: null
      }
   },
   status: '',
   isLoading: false,
}

const profileReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER:
         return {
            ...state,
            profile: action.profile
         }
      case SET_STATUS:
         return {
            ...state,
            status: action.status
         }
      case IS_LOADING:
         return {
            ...state,
            isLoading: action.isLoading
         }
      case SET_PHOTOS:
         return {
            ...state,
            profile: { ...state.profile, photos: action.photos }
         }
      default:
         return state
   }
}


export const setUserProfileAC = (profile) => ({ type: SET_USER, profile })
export const setStatusOfUserAC = (status) => ({ type: SET_STATUS, status })
export const setIsLoadingAC = (isLoading) => ({ type: IS_LOADING, isLoading })
export const setProfilePhotosAC = (photos) => ({ type: SET_PHOTOS, photos })

export const getUserProfileTC = (userID) => {
   return (
      (dispatch) => {
         return (
            getUser(userID).then(data => {
               dispatch(setUserProfileAC(data))
            })
         )
      }
   )
}

export const getStatusOfUserTC = (id) => {
   return (
      (dispatch) => {
         return (
            getStatusOfUser(id).then(data => {
               dispatch(setStatusOfUserAC(data))
            })
         )
      }
   )
}

export const updataStatusOfUserTC = (status) => {
   return (
      (dispatch) => {
         dispatch(setIsLoadingAC(true))
         return (
            updateStatusOfUser(status).then(data => {
               if (data.resultCode == 0) {
                  dispatch(setStatusOfUserAC(status))
                  dispatch(setIsLoadingAC(false))
               }
            })
         )
      }
   )
}


export default profileReducer
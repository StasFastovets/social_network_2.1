import { getUser, updateStatusOfUser } from "../API/api"
import { getStatusOfUser, saveProfile } from './../API/api';

const SET_USER = 'profile/SET_USER'
const SET_STATUS = 'profile/SET_STATUS'
const IS_LOADING = 'profile/IS_LOADING'
const SET_PHOTOS = 'profile/SET_PHOTOS'
const SET_ERROR = 'profile/SET_ERROR'

let initialState = {
   profile: {
      photos: {
         small: null
      },
      contacts: {
         facebook: null,
         website: null,
         vk: null,
         twitter: null,
         instagram: null,
         youtube: null,
         github: null,
         mainLink: null
      },
      lookingForAJobDescription: ''
   },
   status: '',
   isLoading: false,
   error: []
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
      case SET_ERROR:
         return {
            ...state,
            error: action.error
         }
      default:
         return state
   }
}


export const setUserProfileAC = (profile) => ({ type: SET_USER, profile })
export const setStatusOfUserAC = (status) => ({ type: SET_STATUS, status })
export const setIsLoadingAC = (isLoading) => ({ type: IS_LOADING, isLoading })
export const setProfilePhotosAC = (photos) => ({ type: SET_PHOTOS, photos })
export const setErrorAC = (error) => ({ type: SET_ERROR, error })


export const getUserProfileTC = (userID) => async (dispatch) => {
   let response = await getUser(userID)
   dispatch(setUserProfileAC(response))
}

export const getStatusOfUserTC = (id) => async (dispatch) => {
   const response = await getStatusOfUser(id)
   dispatch(setStatusOfUserAC(response))
}

export const updataStatusOfUserTC = (status) => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   const response = await updateStatusOfUser(status)
   if (response.resultCode == 0) {
      dispatch(setStatusOfUserAC(status))
      dispatch(setIsLoadingAC(false))
   }
}

export const saveProfileTC = (profile, userID) => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   let response = await saveProfile(profile)
   if (response.resultCode == 0) {
      dispatch(getUserProfileTC(userID))
      dispatch(setIsLoadingAC(false))
   } else {
      dispatch(setErrorAC(response.messages))
      dispatch(setIsLoadingAC(false))
      return Promise.reject()
   }
}


export default profileReducer
import { getAuth } from './../API/api';
import { logOut } from './../API/api';
import { logIn, getUser, savePhoto } from './../API/api';
import { setProfilePhotosAC } from './profileReducer';


const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_PROFILE = 'auth/SET_PROFILE'
const IS_LOADING = 'auth/IS_LOADING'
const SET_USER = 'auth/SET_USER'
const SET_PHOTOS = 'auth/SET_PHOTOS'


let initialState = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   isLoading: false,
   profile: {
      photos: {
         small: null,
         large: null,
      }
   },
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload
         }
      case SET_PROFILE:
         return {
            ...state,
            profile: action.profile
         }
      case IS_LOADING:
         return {
            ...state,
            isLoading: action.isLoading
         }
      case SET_USER:
         return {
            ...state,
            profile: action.profile
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


const setUserDataAC = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } })
const setIsLoadingAC = (isLoading) => ({ type: IS_LOADING, isLoading })
const setUserAC = (profile) => ({ type: SET_USER, profile })
const setPhotosAC = (photos) => ({ type: SET_PHOTOS, photos })

export const authTC = () => {
   return (
      (dispatch) => {
         return (
            getAuth().then(data => {
               if (data.resultCode === 0) {
                  let email = data.data.email
                  let id = data.data.id
                  let login = data.data.login
                  dispatch(setUserDataAC(id, email, login, true))
                  return getUser(id).then(data => {
                     dispatch(setUserAC(data))
                  })
               }
            })
         )
      }
   )
}

export const logOutTC = () => {
   return (
      (dispatch) => {
         dispatch(setIsLoadingAC(true))
         return (
            logOut().then(data => {
               if (data.resultCode === 0) {
                  dispatch(setUserDataAC(null, null, null, false))
                  dispatch(setIsLoadingAC(false))
               }
            })
         )
      }
   )
}

export const LogInTC = (email, password, rememberMe) => {
   return (
      (dispatch) => {
         return (
            logIn(email, password, rememberMe).then(data => {
               if (data.resultCode === 0) {
                  dispatch(authTC())
               }
            })
         )
      }
   )
}

export const savePhotoTC = (photo) => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   let response = await savePhoto(photo)
   if (response.resultCode === 0) {
      dispatch(setIsLoadingAC(false))
      dispatch(setPhotosAC(response.data.photos))
      dispatch(setProfilePhotosAC(response.data.photos))
   }
}


export default authReducer
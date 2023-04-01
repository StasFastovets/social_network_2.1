import { getAuth, getCaptchaUrl } from './../API/api';
import { logOut } from './../API/api';
import { logIn, getUser, savePhoto } from './../API/api';
import { setProfilePhotosAC } from './profileReducer';


const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_PROFILE = 'auth/SET_PROFILE'
const IS_LOADING = 'auth/IS_LOADING'
const SET_USER = 'auth/SET_USER'
const SET_PHOTOS = 'auth/SET_PHOTOS'
const SET_CAPTCHA = 'auth/SET_CAPTCHA'


let initialState = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   isLoading: false,
   captcha: null,
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
      case SET_CAPTCHA:
         return {
            ...state,
            captcha: action.captcha
         }
      default:
         return state
   }
}


const setUserDataAC = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } })
const setIsLoadingAC = (isLoading) => ({ type: IS_LOADING, isLoading })
const setUserAC = (profile) => ({ type: SET_USER, profile })
const setPhotosAC = (photos) => ({ type: SET_PHOTOS, photos })
const setCaptchaAC = (captcha) => ({ type: SET_CAPTCHA, captcha })


export const authTC = () => async (dispatch) => {
   const response = await getAuth()
   if (response.resultCode === 0) {
      let email = response.data.email
      let id = response.data.id
      let login = response.data.login
      dispatch(setUserDataAC(id, email, login, true))
      const userData = await getUser(id)
      dispatch(setUserAC(userData))
   }
}

export const logOutTC = () => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   const response = await logOut()
   if (response.resultCode === 0) {
      dispatch(setUserDataAC(null, null, null, false))
      dispatch(setIsLoadingAC(false))
   }
}

export const LogInTC = (email, password, rememberMe, captcha) => async (dispatch) => {
   let response = await logIn(email, password, rememberMe, captcha)
   if (response.resultCode === 0) {
      dispatch(authTC())
   } else {
      if (response.resultCode === 10) {
         dispatch(getCaptchaTC())
      }
   }
}

export const getCaptchaTC = () => async (dispatch) => {
   const response = await getCaptchaUrl()
   const captcha = response.url
   dispatch(setCaptchaAC(captcha))
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
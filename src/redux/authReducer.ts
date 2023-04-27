import { ThunkAction } from 'redux-thunk';
import { getAuth, getCaptchaUrl, ResultCode } from '../API/api';
import { logOut } from '../API/api';
import { logIn, getUser, savePhoto } from '../API/api';
import { setProfilePhotosAC, SetProfilePhotosACType } from './profileReducer';
import { AppStateType } from './redux';


const SET_USER_DATA = 'auth/SET_USER_DATA'
const IS_LOADING = 'auth/IS_LOADING'
const SET_USER = 'auth/SET_USER'
const SET_PHOTOS = 'auth/SET_PHOTOS'
const SET_CAPTCHA = 'auth/SET_CAPTCHA'

export type InitialStateProfilePhotosType = {
   small: string | null,
   large: string | null,
}

export type InitialStateProfileContactsType = {
   github: string | null,
   vk: string | null,
   facebook: string | null,
   instagram: string | null,
   twitter: string | null,
   website: string | null,
   youtube: string | null,
   mainLink: string | null,
}

export type InitialStateProfileType = {
   userId: number | null,
   lookingForAJob: boolean,
   lookingForAJobDescription: string | null,
   fullName: string | null,
   photos: InitialStateProfilePhotosType,
   contacts: InitialStateProfileContactsType
   aboutMe: string | null
}

export type InitialStateType = {
   id: number | null,
   email: string | null,
   login: string | null,
   isAuth: boolean,
   isLoading: boolean,
   captcha: string | null,
   profile: InitialStateProfileType,
}

let initialState: InitialStateType = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   isLoading: false,
   captcha: null,
   profile: {
      userId: null,
      lookingForAJob: false,
      lookingForAJobDescription: null,
      fullName: null,
      aboutMe: null,
      contacts: {
         github: null,
         vk: null,
         facebook: null,
         instagram: null,
         twitter: null,
         website: null,
         youtube: null,
         mainLink: null
      },
      photos: {
         small: null,
         large: null,
      }
   }
}

type ActionsTypes = SetUserDataACType | SetIsLoadingACType | SetUserACType | SetPhotosACType | SetCaptchaACType | SetProfilePhotosACType

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload
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

//////////////////////////////////////////////////////////////////////////////////////////////
type SetUserDataPayloadACType = {
   id: number | null,
   email: string | null,
   login: string | null,
   isAuth: boolean
}

type SetUserDataACType = {
   type: typeof SET_USER_DATA,
   payload: SetUserDataPayloadACType
}

const setUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataACType =>
   ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } })
////////////////////////////////////////////////////////////////////////////////////////////////
type SetIsLoadingACType = {
   type: typeof IS_LOADING,
   isLoading: boolean
}

const setIsLoadingAC = (isLoading: boolean): SetIsLoadingACType => ({ type: IS_LOADING, isLoading })
////////////////////////////////////////////////////////////////////////////////////////////////////
type SetUserACType = {
   type: typeof SET_USER,
   profile: InitialStateProfileType
}

const setUserAC = (profile: InitialStateProfileType): SetUserACType => ({ type: SET_USER, profile })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type SetPhotosACType = {
   type: typeof SET_PHOTOS,
   photos: InitialStateProfilePhotosType
}

const setPhotosAC = (photos: InitialStateProfilePhotosType): SetPhotosACType => ({ type: SET_PHOTOS, photos })
/////////////////////////////////////////////////////////////////////////////////////////////////////
type SetCaptchaACType = {
   type: typeof SET_CAPTCHA,
   captcha: string
}

const setCaptchaAC = (captcha: string): SetCaptchaACType => ({ type: SET_CAPTCHA, captcha })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authTC = (): ThunkType => async (dispatch) => {
   const response = await getAuth()
   if (response.resultCode === ResultCode.Success) {
      let email = response.data.email
      let id = response.data.id
      let login = response.data.login
      dispatch(setUserDataAC(id, email, login, true))
      const userData = await getUser(id)
      dispatch(setUserAC(userData))
   }
}

export const logOutTC = (): ThunkType => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   const response = await logOut()
   if (response.resultCode === ResultCode.Success) {
      dispatch(setUserDataAC(null, null, null, false))
      dispatch(setIsLoadingAC(false))
   }
}

export const LogInTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
   let response = await logIn(email, password, rememberMe, captcha)
   if (response.resultCode === ResultCode.Success) {
      dispatch(authTC())
   } else {
      if (response.resultCode === ResultCode.CaptchaIsRequired) {
         dispatch(getCaptchaTC())
      }
   }
}

export const getCaptchaTC = (): ThunkType => async (dispatch) => {
   const response = await getCaptchaUrl()
   const captcha = response.url
   dispatch(setCaptchaAC(captcha))
}

export const savePhotoTC = (photo: File): ThunkType => async (dispatch) => {
   dispatch(setIsLoadingAC(true))
   let response = await savePhoto(photo)
   if (response.resultCode === ResultCode.Success) {
      dispatch(setIsLoadingAC(false))
      dispatch(setPhotosAC(response.data.photos))
      dispatch(setProfilePhotosAC(response.data.photos))
   }
}


export default authReducer
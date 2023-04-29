import { ThunkAction } from 'redux-thunk';
import { getAuth, getCaptchaUrl, ResultCode } from '../API/api';
import { logOut } from '../API/api';
import { logIn, getUser, savePhoto } from '../API/api';
import { setProfilePhotosAC } from './profileReducer';
import { AppStateType } from './redux';
import Nullable from './nullable'


export type PhotosType = {
   small: Nullable<string>,
   large: Nullable<string>,
}

export type ContactsType = {
   github: Nullable<string>,
   vk: Nullable<string>,
   facebook: Nullable<string>,
   instagram: Nullable<string>,
   twitter: Nullable<string>,
   website: Nullable<string>,
   youtube: Nullable<string>,
   mainLink: Nullable<string>,
}

export type ProfileType = {
   userId: Nullable<number>,
   lookingForAJob: boolean,
   lookingForAJobDescription: Nullable<string>,
   fullName: Nullable<string>,
   photos: PhotosType,
   contacts: ContactsType
   aboutMe: Nullable<string>
}

let initialState = {
   id: null as Nullable<number>,
   email: null as Nullable<string>,
   login: null as Nullable<string>,
   isAuth: false,
   isLoading: false,
   captcha: null as Nullable<string>,
   profile: {
      userId: null as Nullable<number>,
      lookingForAJob: false,
      lookingForAJobDescription: null as Nullable<string>,
      fullName: null as Nullable<string>,
      aboutMe: null as Nullable<string>,
      contacts: {
         github: null as Nullable<string>,
         vk: null as Nullable<string>,
         facebook: null as Nullable<string>,
         instagram: null as Nullable<string>,
         twitter: null as Nullable<string>,
         website: null as Nullable<string>,
         youtube: null as Nullable<string>,
         mainLink: null as Nullable<string>,
      },
      photos: {
         small: null as Nullable<string>,
         large: null as Nullable<string>,
      }
   }
}

type StateType = typeof initialState

type ActionsTypes = ReturnType<typeof setUserDataAC> |
   ReturnType<typeof setIsLoadingAC> |
   ReturnType<typeof setUserAC> |
   ReturnType<typeof setPhotosAC> |
   ReturnType<typeof setCaptchaAC> |
   ReturnType<typeof setProfilePhotosAC>

const authReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {
   switch (action.type) {
      case 'auth/SET_USER_DATA':
         return {
            ...state,
            ...action.payload
         }
      case 'auth/IS_LOADING':
         return {
            ...state,
            isLoading: action.isLoading
         }
      case 'auth/SET_USER':
         return {
            ...state,
            profile: action.profile
         }
      case 'auth/SET_PHOTOS':
         return {
            ...state,
            profile: { ...state.profile, photos: action.photos }
         }
      case 'auth/SET_CAPTCHA':
         return {
            ...state,
            captcha: action.captcha
         }
      default:
         return state
   }
}

//////////////////////////////////////////////////////////////////////////////////////////////
const setUserDataAC = (id: Nullable<number>, email: Nullable<string>, login: Nullable<string>, isAuth: boolean) =>
   ({ type: 'auth/SET_USER_DATA', payload: { id, email, login, isAuth } } as const)

const setIsLoadingAC = (isLoading: boolean) => ({ type: 'auth/IS_LOADING', isLoading } as const)

const setUserAC = (profile: ProfileType) => ({ type: 'auth/SET_USER', profile } as const)

const setPhotosAC = (photos: PhotosType) => ({ type: 'auth/SET_PHOTOS', photos } as const)

const setCaptchaAC = (captcha: string) => ({ type: 'auth/SET_CAPTCHA', captcha } as const)
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
import { ThunkAction } from 'redux-thunk';
import { getAuth, getCaptchaUrl, ResultCode } from '../API/api';
import { logOut } from '../API/api';
import { logIn, getUser, savePhoto } from '../API/api';
import { actionsProfile } from './profileReducer';

import { AppStateType, BaseThunkType, PropertiesTypes } from './redux';
import Nullable from './nullable'
import { Action } from 'redux';


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


export const actions = {
   setUserDataAC: (id: Nullable<number>, email: Nullable<string>, login: Nullable<string>, isAuth: boolean) =>
      ({ type: 'auth/SET_USER_DATA', payload: { id, email, login, isAuth } } as const),
   setIsLoadingAC: (isLoading: boolean) => ({ type: 'auth/IS_LOADING', isLoading } as const),
   setUserAC: (profile: ProfileType) => ({ type: 'auth/SET_USER', profile } as const),
   setPhotosAC: (photos: PhotosType) => ({ type: 'auth/SET_PHOTOS', photos } as const),
   setCaptchaAC: (captcha: string) => ({ type: 'auth/SET_CAPTCHA', captcha } as const),
}

type ActionsType = ReturnType<PropertiesTypes<typeof actions>>

const authReducer = (state: StateType = initialState, action: ActionsType): StateType => {
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


// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export type ThunkAuthType = BaseThunkType<ActionsType | ReturnType<typeof actionsProfile.setProfilePhotosAC>>

export const authTC = (): ThunkAuthType => async (dispatch) => {
   const response = await getAuth()
   if (response.resultCode === ResultCode.Success) {
      let email = response.data.email
      let id = response.data.id
      let login = response.data.login
      dispatch(actions.setUserDataAC(id, email, login, true))
      const userData = await getUser(id)
      dispatch(actions.setUserAC(userData))
   }
}

export const logOutTC = (): ThunkAuthType => async (dispatch) => {
   dispatch(actions.setIsLoadingAC(true))
   const response = await logOut()
   if (response.resultCode === ResultCode.Success) {
      dispatch(actions.setUserDataAC(null, null, null, false))
      dispatch(actions.setIsLoadingAC(false))
   }
}

export const LogInTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkAuthType => async (dispatch) => {
   let response = await logIn(email, password, rememberMe, captcha)
   if (response.resultCode === ResultCode.Success) {
      dispatch(authTC())
   } else {
      if (response.resultCode === ResultCode.CaptchaIsRequired) {
         dispatch(getCaptchaTC())
      }
   }
}

export const getCaptchaTC = (): ThunkAuthType => async (dispatch) => {
   const response = await getCaptchaUrl()
   const captcha = response.url
   dispatch(actions.setCaptchaAC(captcha))
}


export const savePhotoTC = (photo: File): ThunkAuthType => async (dispatch) => {
   dispatch(actions.setIsLoadingAC(true))
   let response = await savePhoto(photo)
   if (response.resultCode === ResultCode.Success) {
      dispatch(actions.setIsLoadingAC(false))
      dispatch(actions.setPhotosAC(response.data.photos))
      dispatch(actionsProfile.setProfilePhotosAC(response.data.photos))
   }
}


export default authReducer
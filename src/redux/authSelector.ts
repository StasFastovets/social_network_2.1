import { AppStateType } from './redux'

export const getId = (state: AppStateType) => {
   return state.auth.id
}

export const getEmail = (state: AppStateType) => {
   return state.auth.email
}

export const getLogin = (state: AppStateType) => {
   return state.auth.login
}

export const getAuth = (state: AppStateType) => {
   return state.auth.isAuth
}

export const getPhotoSmall = (state: AppStateType) => {
   return state.auth.profile.photos.small
}

export const getIsLoading = (state: AppStateType) => {
   return state.auth.isLoading
}

export const getCaptcha = (state: AppStateType) => {
   return state.auth.captcha}




import { AppStateType } from './redux'
import { createSelector } from 'reselect';

// export const getId = (state: AppStateType) => {
//    return state.auth.id
// }

export const getId = createSelector(
   (state: AppStateType) => state.auth.id,
   (id) => id);

// export const getEmail = (state: AppStateType) => {
//    return state.auth.email
// }

export const getEmail = createSelector(
   (state: AppStateType) => state.auth.email,
   (email) => email);

// export const getLogin = (state: AppStateType) => {
//    return state.auth.login
// }

export const getLogin = createSelector(
   (state: AppStateType) => state.auth.login,
   (login) => login);

// export const getAuth = (state: AppStateType) => {
//    return state.auth.isAuth
// }

export const getAuth = createSelector(
   (state: AppStateType) => state.auth.isAuth,
   (isAuth) => isAuth);

// export const getPhotoSmall = (state: AppStateType) => {
//    return state.auth.profile.photos.small
// }

export const getPhotoSmall = createSelector(
   (state: AppStateType) => state.auth.profile.photos.small,
   (photo) => photo);

// export const getIsLoading = (state: AppStateType) => {
//    return state.auth.isLoading
// }

export const getIsLoading = createSelector(
   (state: AppStateType) => state.auth.isLoading,
   (isLoading) => isLoading);

// export const getCaptcha = (state: AppStateType) => {
//    return state.auth.captcha
// }

export const getCaptcha = createSelector(
   (state: AppStateType) => state.auth.captcha,
   (captcha) => captcha);




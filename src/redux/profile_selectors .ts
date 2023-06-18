import { AppStateType } from './redux'
import { createSelector } from 'reselect';

// export const getIsAuth = (state: AppStateType) => {
//    return state.auth.isAuth
// }

export const getIsAuth = createSelector(
   (state: AppStateType) => state.auth.isAuth,
   (isAuth) => isAuth);

// export const getAuthorizedUserID = (state: AppStateType) => {
//    return state.auth.id
// }

export const getAuthorizedUserID = createSelector(
   (state: AppStateType) => state.auth.id,
   (id) => id);

// export const getProfile = (state: AppStateType) => {
//    return state.profile.profile
// }

export const getProfile = createSelector(
   (state: AppStateType) => state.profile.profile,
   (profile) => profile);

// export const getStatus = (state: AppStateType) => {
//    return state.profile.status
// }

export const getStatus = createSelector(
   (state: AppStateType) => state.profile.status,
   (status) => status);

// export const getIsLoading = (state: AppStateType) => {
//    return state.profile.isLoading
// }

export const getIsLoading = createSelector(
   (state: AppStateType) => state.profile.isLoading,
   (isLoading) => isLoading);

// export const getContactsErrors = (state: AppStateType) => {
//    return state.profile.contactsErrors 
// }

export const getContactsErrors = createSelector(
   (state: AppStateType) => state.profile.contactsErrors,
   (contactsErrors) => contactsErrors);


import { AppStateType } from './redux'

export const getIsAuth = (state: AppStateType) => {
   return state.auth.isAuth
}

export const getAuthorizedUserID = (state: AppStateType) => {
   return state.auth.id
}

export const getProfile = (state: AppStateType) => {
   return state.profile.profile
}

export const getStatus = (state: AppStateType) => {
   return state.profile.status
}

export const getIsLoading = (state: AppStateType) => {
   return state.profile.isLoading
}

export const getContactsErrors = (state: AppStateType) => {
   return state.profile.contactsErrors
}


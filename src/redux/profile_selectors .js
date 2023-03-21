

export const getIsAuth = (state) => {
   return state.auth.isAuth
}

export const getAuthorizedUserID = (state) => {
   return state.auth.id
}

export const getProfile = (state) => {
   return state.profile.profile
}

export const getStatus = (state) => {
   return state.profile.status
}

export const getIsLoading = (state) => {
   return state.profile.isLoading
}


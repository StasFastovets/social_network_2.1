import {AppStateType} from './redux'

export const initializedApp = (state: AppStateType) => {
   return state.app.initialized
}
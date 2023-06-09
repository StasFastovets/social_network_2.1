import { AppStateType } from './redux'
import { createSelector } from 'reselect';

export const initializedApp = (state: AppStateType) => {
   return state.app.initialized
}

export const initializedAppSelector = createSelector(
   (state: AppStateType) => state.app.initialized,
   (initialized) => initialized
);
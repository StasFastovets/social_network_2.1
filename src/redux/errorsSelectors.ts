import { AppStateType } from './redux'
import { createSelector } from 'reselect';


export const getError = createSelector(
   (state: AppStateType) => state.errors.error,
   (error) => error);


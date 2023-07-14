import { AppStateType } from './redux'
import { createSelector } from 'reselect';


export const getMessages = createSelector(
   (state: AppStateType) => state.chat.messages,
   (messages) => messages);
   
export const getStatus = createSelector(
   (state: AppStateType) => state.chat.status,
   (status) => status);





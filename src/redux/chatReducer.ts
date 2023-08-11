import { AppStateType, BaseThunkType, PropertiesTypes } from './redux';
import { chatAPI, ChatMessageType } from '../API/chat-api';
import { ThunkDispatch } from 'redux-thunk';
import { CombinedState } from 'redux';
import uuid from 'react-uuid';


export type StatusType = 'pending' | 'ready' | 'error'

let initialState = {
   messages: [] as ChatMessageType[],
   status: 'pending' as StatusType
}

type StateType = typeof initialState

export const actions = {
   messagesReceivedAC: (messages: ChatMessageType[]) => ({ type: 'chat/MESEGESS_RECEIVED', payload: { messages } } as const),
   statusChangedAC: (status: StatusType) => ({ type: 'chat/STATUS_CHANGED', payload: { status } } as const),
}

export type ActionsChatType = ReturnType<PropertiesTypes<typeof actions>>

const chatReducer = (state: StateType = initialState, action: ActionsChatType): StateType => {
   switch (action.type) {
      case 'chat/MESEGESS_RECEIVED':
         return {
            ...state,
            messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: uuid() }))].filter((messages, index, array) => index >= array.length - 100)
         }
      case 'chat/STATUS_CHANGED':
         return {
            ...state,
            status: action.payload.status
         }
      default:
         return state
   }
}


// export type ThunkChatType<R = void> = ThunkAction<R, AppStateType, unknown, ActionsType>;
export type ThunkChatType = BaseThunkType<ActionsChatType>


export const startMessagesListiningTC = (): ThunkChatType => async (dispatch) => {
   chatAPI.start()
   chatAPI.subscribeMessage((messages: ChatMessageType[]) => dispatch(actions.messagesReceivedAC(messages)))
   chatAPI.subscribeStatus(statusChangedHendlerCreator(dispatch))
}

export const stopMessagesListiningTC = (): ThunkChatType => async (dispatch) => {
   chatAPI.unsubscribeMessage((messages: ChatMessageType[]) => dispatch(actions.messagesReceivedAC(messages)))
   chatAPI.unsubscribeStatus(statusChangedHendlerCreator(dispatch))
   chatAPI.stop()
}

export const sendMessageTC = (message: string): ThunkChatType => async (dispatch) => {
   chatAPI.sendMessage(message)
}

let _statusChangedHendler: ((status: StatusType) => void) | null = null

const statusChangedHendlerCreator = (dispatch: ThunkDispatch<CombinedState<AppStateType>, any, ActionsChatType>) => {
   if (_statusChangedHendler === null) {
      _statusChangedHendler = (status) => dispatch(actions.statusChangedAC(status));
   }
   return _statusChangedHendler;
};

export default chatReducer
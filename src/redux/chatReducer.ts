import { BaseThunkType, PropertiesTypes } from './redux';
import { chatAPI, ChatMessageType } from '../API/chat-api';


type StatusType = 'pending' | 'ready'

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
            messages: [...state.messages, ...action.payload.messages]
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
   chatAPI.subscribe((messages) => dispatch(actions.messagesReceivedAC(messages)))
}

export const stopMessagesListiningTC = (): ThunkChatType => async (dispatch) => {
   chatAPI.unsubscribe((messages) => dispatch(actions.messagesReceivedAC(messages)))
   chatAPI.stop()
}

export const sendMessageTC = (message: string): ThunkChatType => async (dispatch) => {
   chatAPI.sendMessage(message)
}


export default chatReducer
import { authTC } from './authReducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type InitialStateType = {
   initialized: boolean
}

let initialState: InitialStateType = {
   initialized: false,
}

type ActionsTypes = InitializedSuccessActionType

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

   switch (action.type) {
      case INITIALIZED_SUCCESS:
         return {
            ...state,
            initialized: true,
         }
      default:
         return state
   }
}

type InitializedSuccessActionType = {
   type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const InitializedAppTC = (): ThunkType => async (dispatch) => {
   await dispatch(authTC())
   dispatch(initializedSuccess())
}
 
export default appReducer
 
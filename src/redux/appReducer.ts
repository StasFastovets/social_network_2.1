import { authTC } from './authReducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, BaseThunkType, PropertiesTypes } from './redux';


let initialState = {
   initialized: false,
}

type StateType = typeof initialState


export const actionsApp = {
   initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const)
}

type ActionsType = ReturnType<PropertiesTypes<typeof actionsApp>>

const appReducer = (state: StateType = initialState, action: ActionsType): StateType => {

   switch (action.type) {
      case 'app/INITIALIZED_SUCCESS':
         return {
            ...state,
            initialized: true,
         }
      default:
         return state
   }
}

export type ThunkAppType = BaseThunkType<ActionsType> 
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const InitializedAppTC = (): ThunkAppType => async (dispatch) => {
   await dispatch(authTC())
   dispatch(actionsApp.initializedSuccess())
}

export default appReducer

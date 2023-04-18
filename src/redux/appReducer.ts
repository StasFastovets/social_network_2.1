import { authTC } from './authReducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type InitialStateType = {
   initialized: boolean
}

let initialState: InitialStateType = {
   initialized: false,
}

const appReducer = (state = initialState, action: any): InitialStateType => {

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


export const InitializedAppTC = () => async (dispatch: any) => {
   await dispatch(authTC())
   dispatch(initializedSuccess())
}
 
export default appReducer

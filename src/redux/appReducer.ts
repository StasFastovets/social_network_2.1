import { authTC } from './authReducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux';


let initialState = {
   initialized: false,
}

type StateType = typeof initialState

type ActionsTypes = ReturnType<typeof initializedSuccess>

const appReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {

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

//////////////////////////////////////////////////////////////////////////////////
export const initializedSuccess = () => ({ type: 'app/INITIALIZED_SUCCESS' })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const InitializedAppTC = (): ThunkType => async (dispatch) => {
   await dispatch(authTC())
   dispatch(initializedSuccess())
}
 
export default appReducer
 
import { authTC } from './authReducer';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState = {
   initialized: false,
}

const appReducer = (state = initialState, action) => {

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


export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })


// export const InitializedAppTC = () => (dispatch) => {
//    let promise = dispatch(authTC())
//    promise.then(() => dispatch(initializedSuccess()) )
// }

export const InitializedAppTC = () => async (dispatch) => {
   await dispatch(authTC())
   dispatch(initializedSuccess())
}

export default appReducer

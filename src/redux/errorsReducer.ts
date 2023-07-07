import { AppStateType, BaseThunkType, PropertiesTypes } from './redux';


let initialState = {
   error: '',
}

type StateType = typeof initialState


export const actionsErrors = {
   setErrorAC: (error: string) => ({ type: 'errors/SET_ERRORS', error } as const)
}

type ActionsType = ReturnType<PropertiesTypes<typeof actionsErrors>>

const errorsReducer = (state: StateType = initialState, action: ActionsType): StateType => {

   switch (action.type) {
      case 'errors/SET_ERRORS':
         return {
            ...state,
            error: action.error,
         }
      default:
         return state
   }
}

export default errorsReducer

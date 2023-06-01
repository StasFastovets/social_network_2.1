import { Action, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./authReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import profileReducer from "./profileReducer";
import appReducer from "./appReducer";
import usersReducer from "./usersReducer";
import { compose } from "redux";


let reducers = combineReducers({
   auth: authReducer,
   profile: profileReducer,
   app: appReducer,
   users: usersReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>     // служит для установления возвращаемого из функции типа

//@ts-ignore                 // typescript игнорирует строчку ниже
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

//export type BaseThunkType< A extends Action, R = Promise<void> > = ThunkAction<R, AppStateType, unknown, A> 
export type BaseThunkType< BasicAction extends Action, ReturnType = Promise<void> > = ThunkAction<ReturnType, AppStateType, unknown, BasicAction> 

// export type AppDispatch = typeof store.dispatch

export default store


//export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never; - можно так
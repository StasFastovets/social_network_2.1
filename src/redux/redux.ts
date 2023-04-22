import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
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



export default store
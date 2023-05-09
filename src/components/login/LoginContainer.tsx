import { connect } from "react-redux"
import Login from "./login"
import { LogInTC } from "../../redux/authReducer"
import { AppStateType } from "../../redux/redux"
import { boolean, string } from "yup"


type MapStatePropsType = {
   isAuth: boolean
   captcha: string | null
}

type MapDispatchPropsType = {
   LogInTC: (email: string, password: string, remember: boolean, captcha: string) => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
   return {
      isAuth: state.auth.isAuth,
      captcha: state.auth.captcha
   }
}


const LoginContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { LogInTC })(Login)

export default LoginContainer

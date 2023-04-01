import { connect } from "react-redux"
import Login from "./login"
import { LogInTC } from "../../redux/authReducer"


let mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth,
      captcha: state.auth.captcha
   }
}


const LoginContainer = connect(mapStateToProps, { LogInTC })(Login)

export default LoginContainer

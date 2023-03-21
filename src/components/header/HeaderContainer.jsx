import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { authTC, logOutTC } from './../../redux/authReducer';


// const HeaderAPIContainer = (props) => {
//    useEffect(() => { props.authTC() }, [])
//    return (
//       <Header {...props} />
//    )
// }

let mapStateToProps = (state) => {
   return {
      id: state.auth.id,
      email: state.auth.email,
      login: state.auth.login,
      isAuth: state.auth.isAuth,
      photoSmall: state.auth.profile.photos.small,
      isLoading: state.auth.isLoading,
   }
}


// const HeaderContainer = connect(mapStateToProps, { authTC, logOutTC })(HeaderAPIContainer)
const HeaderContainer = connect(mapStateToProps, { logOutTC })(Header)

export default HeaderContainer
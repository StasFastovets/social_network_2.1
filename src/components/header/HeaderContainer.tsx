import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { authTC, logOutTC } from '../../redux/authReducer';
import { AppStateType } from "../../redux/redux";


// const HeaderAPIContainer = (props) => {
//    useEffect(() => { props.authTC() }, [])
//    return (
//       <Header {...props} />
//    )
// }

type MapStatePropsType = {
   id: number | null,
   email: string | null,
   login: string | null,
   isAuth: boolean,
   photoSmall: string | null,
   isLoading: boolean,
}

type MapDispatchPropsType = {
   logOutTC: () => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
const HeaderContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { logOutTC })(Header)

export default HeaderContainer
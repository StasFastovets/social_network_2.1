import React from "react";
import { Navigate, useLocation } from "react-router-dom";


export const withAuthRedirect = (Component) => {
   const RedirectComponent = (props) => {
      let location = useLocation()
      if (!props.isAuth) {
         return <Navigate to='/login' state={{ from: location }} />
      }
      return <Component {...props} />;
   }
   return RedirectComponent;
}
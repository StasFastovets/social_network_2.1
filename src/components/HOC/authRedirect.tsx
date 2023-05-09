import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ComponentType } from "react";


// export const withAuthRedirect = (Component) => {
//    const RedirectComponent = (props) => {
//       let location = useLocation()
//       if (!props.isAuth) {
//          return <Navigate to='/login' state={{ from: location }} />
//       }
//       return <Component {...props} />;
//    }
//    return RedirectComponent;
// }

type Props = {
   isAuth: boolean;
}

export const withAuthRedirect = <P extends object>(Component: ComponentType<P>): React.FC<P & Props> => {
   const RedirectComponent: React.FC<P & Props> = (props) => {
      const location = useLocation();
      if (!props.isAuth) {
         return <Navigate to='/login' state={{ from: location }} />;
      }
      return <Component {...props} />;
   };
   return RedirectComponent;
};
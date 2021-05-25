import React  from "react";
// import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect,  } from "react-router";
// import { TheLayout } from "src/containers";
// import Login from "src/views/pages/login/Login";

const AuthRoute = (props) => {
 
  // const [permission, setPermission] = useState(false);
  let isPermission = useSelector((state) => state.Login.isLogin);
  // useEffect(() => {
  //   setPermission(isPermission);
  // }, []);
  //   let PublicRoute = ({
  //     path,
  //     children,
  //     redirect = "/",
  //     isAuthenticated = false,
  //     ...rest
  //   }) => {
  //     if (!isAuthenticated) {
  //       return <Route path={path} {...rest} component={children} />;
  //     } else {
  //       return <Redirect to={redirect} />;
  //     }
  //   };

  //   let PrivateRoute = ({
  //     path,
  //     children,
  //     redirect = "/signin",
  //     isAuthenticated = false,
  //     accountType,
  //     roles = [],
  //     ...rest
  //   }) => {
  //     let location = useLocation();

  //     if (isAuthenticated) {
  //       if (!roles.includes(accountType)) {
  //         return <Redirect to="/404" />;
  //       }
  //       return <Route path={path} component={children} {...rest} />;
  //     } else {
  //       return (
  //         <Redirect
  //           to={{
  //             pathname: redirect,
  //             state: { from: location.pathname },
  //             search: `?from=${location.pathname}`,
  //           }}
  //         />
  //       );
  //     }
  //   };

  if (isPermission) {
    return <Route path={props.path} component={props.render}></Route>;
  } else {
    return <Redirect to="/login"></Redirect>;
  }

  //   return (

  //     <Route
  //       path={props.path}
  //       component= {   ?
  //         props.render }
  //     //   render={(data) =>
  //     //     permission ? (
  //     //       <props.component {...data}> </props.component>
  //     //     ) : (
  //     //       <Redirect to={{ pathname: "/login" }}></Redirect>
  //     //     )
  //     //   }
  //     ></Route>
  //   );
};

export default AuthRoute;

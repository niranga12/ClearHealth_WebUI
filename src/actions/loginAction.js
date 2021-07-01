
import jwt from "jwt-decode"; // import dependency
import {
  
  LOG_OUT,
  
  USER_LOGIN,
} from "src/constansts";
// import history  from "../_helpers/history";
// import { useHistory } from "react-router-dom";
import {notify} from 'reapop'


// import history from "../_helpers/history";
// import onError from "src/_helpers/onerror";
import {userLogin} from "../service/userService";

// export const  login = (loginDetail) =>{

//     return {
//         type:'LOGIN',
//         payload:"fadsf"
//     }

// }

// export const login = (loginDetail) =>{

//     return (dispatch) => {
//       //let history = useHistory();

//       // dispatch({
//       //   type: FETCHING_USER
//       // });
//     //    dispatch({type: CREATE_ORGANIZATION});
//        axios.post(`${WebAPi}/auth/login`,loginDetail)
//           .then((res) =>{
//               console.log(res);
//               const token = res.data.data.token;
//               localStorage.setItem('token',token);
//               const user = jwt(token);
//               // @ts-ignore
//               let loginUser={ ...user, isLogin:true}
//               console.log(user)

//               dispatch({type: USER_LOGIN, payload: loginUser});

//           })
//           .catch((error)=> {
//               console.log(error);
//             //   dispatch({type: CREATE_ORGANIZATION_FAILURE, payload: error});
//           })
//     }


//   }



export const login = (loginDetail,history) => async (dispatch) => {
    // let history = useHistory();
   
  
    try {
      // const res = await axios.post(`${WebAPi}/auth/login`, loginDetail)
      // const res =  axios.post(`${WebAPi}/auth/login`, loginDetail).then(
          userLogin(loginDetail).then(
        
          res=>{
              const token = res.data.data.token;
              localStorage.setItem("token", token);
              const user = jwt(token);
              // @ts-ignore
              let loginUser = { ...user, isLogin: true };
              dispatch({
                type: USER_LOGIN,
                payload: loginUser,
              });
              
              dispatch(notify('Logged in successfully', 'success'))
              history.push("/main");
          }
      ).catch( error=>  dispatch(notify('Invalid Email or Password ', 'error'))
        //  onError(error, dispatch) 
         );
     
    } catch (e) {
        console.log(e);
      dispatch(notify('Login Fail', 'info'))
        
      
    }
  };

// export const login = (loginDetail) => async (dispatch) => {
//   // let history = useHistory();
 

//   try {
//     // const res = await axios.post(`${WebAPi}/auth/login`, loginDetail)

   
//     const token = res.data.data.token;
//     localStorage.setItem("token", token);
//     const user = await jwt(token);
//     // @ts-ignore
//     let loginUser = { ...user, isLogin: true };
//     dispatch({
//       type: USER_LOGIN,
//       payload: loginUser,
//     });
//     debugger;
//     dispatch(notify('Login Success', 'success'))
//     history.push("/dashboard");


    
//   } catch (e) {
//       console.log(e);
//     dispatch(notify('Login Fail', 'info'))
      
//     // dispatch( {
//     //     type: USERS_ERROR,
//     //     payload: console.log(e),
//     // })
//   }
// };

export const logout = () => {
  return function (dispatch) {
    localStorage.clear();
    dispatch({
      type: LOG_OUT,
    });
  };
};

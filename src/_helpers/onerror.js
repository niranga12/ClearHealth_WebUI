// import { useDispatch } from "react-redux";
import { notify } from "reapop";


const OnError =(error,dispatch) =>{
  
  // 
    // console.error('Request Failed:', error.config);
    if (error.response) {
    
    //  console.error('Status:',  error.response.status);
    //  console.error('Data:',    error.response.data);
    //  console.error('Headers:', error.response.headers);
     console.error('Message:', error.response.data.message);

     dispatch(notify(`${error.response.data.message}`, 'error'))
    } else {
   console.error('Error Message:', error.message);
 }
}
// export default OnError;



// const OnError = function(error) {
//   console.error('Request Failed:', error.config);
//   if (error.response) {
//    console.error('Status:',  error.response.status);
//    console.error('Data:',    error.response.data);
//    console.error('Headers:', error.response.headers);
//   } else {
//  console.error('Error Message:', error.message);
// }

// return Promise.reject(error.response || error.message);
// }
// }
 export default OnError;

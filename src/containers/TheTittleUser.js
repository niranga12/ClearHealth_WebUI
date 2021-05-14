import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TheTittleUser = () => {
  const [name, setname] = useState("")
 const userName= useSelector(state=>state.Login.username)

  useEffect(() => { setname(userName)}, [])

   

  return (
    <ul className="list-group pl-3 pr-2 list-unstyled">
      <li className="font-weight-bold">{name}</li>
      {/* <li className="small">Manager</li> */}
    </ul>
  );
};

export default TheTittleUser;

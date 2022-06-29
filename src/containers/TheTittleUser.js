// import React, { useEffect, useState } from "react";
import React from 'react'
import { useSelector } from 'react-redux'

const TheTittleUser = () => {
  // const [loginDetail, setLoginDetail] = useState("")
  const user = useSelector((state) => state.Login)

  // useEffect(() => { setLoginDetail(user)}, [])

  return (
    <ul className="list-group  pr-1 list-unstyled">
      <li className="font-weight-bold">{user.name}</li>
      <li className="small">{user.roleType}</li>
    </ul>
  )
}

export default TheTittleUser

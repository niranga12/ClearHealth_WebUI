import React, { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

ReactGA.initialize('G-BMRB78ZB3Q')
ReactGA.send('pageview')

export default function GoogleAnalytics() {
  const location = useLocation()
  const loginState = useSelector((state) => state.Login)

  useEffect(() => {
    const currentPath = location.pathname + location.search
    ReactGA.send({ hitType: 'pageview', page: currentPath })
  }, [location])

  useEffect(() => {
    ReactGA.set({
      user_properties: {
        isLoggedIn: loginState.isLogin,
        username: loginState.username,
        roleType: loginState.roleType
      }
    })
  }, [loginState.isLogin])

  return null
}

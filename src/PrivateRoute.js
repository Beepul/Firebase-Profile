import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const PrivateRoute = ({isLoggedin,user,component: Component,...rest}) => {
  return (
    <>
   { isLoggedin && user 
    ?
    (
        <Component />
    )
    :
    (
        <Navigate to={{
            pathname: isLoggedin ? '/' : '/login',
            // state: {from: location}
        }}
        />
    )
}
</>
  )
}

export default PrivateRoute
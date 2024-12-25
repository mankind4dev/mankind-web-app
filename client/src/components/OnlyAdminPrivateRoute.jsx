import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
//outlet are all the children
//Navigate is a componnent which is redirect while useNavigate is a Props-hook
export default function OnlyAdminPrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />
}

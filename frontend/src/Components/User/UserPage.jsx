import React from 'react'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router'

const UserPage = () => {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  )
}

export default UserPage

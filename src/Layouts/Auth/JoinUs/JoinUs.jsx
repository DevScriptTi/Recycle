import React from 'react'
import { Auth } from '../Auth'
import { Outlet } from 'react-router-dom'

export const JoinUs = () => {
  return (
    <Auth>
        <Outlet/>
    </Auth>
  )
}

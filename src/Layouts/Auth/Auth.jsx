import React from 'react'
import { CircleBottom, CircleUpp } from './Circle'
import { Logo } from './Logo'

export const Auth = ({children}) => {
  return (
    <div className="relative flex justify-between items-center xl:h-content xl:overflow-hidden">
      <CircleUpp/>
      <CircleBottom/>
      {children}
      <Logo/>
    </div>

  )
}

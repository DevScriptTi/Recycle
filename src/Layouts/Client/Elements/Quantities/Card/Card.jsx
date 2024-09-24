import React from 'react'
import { Head } from './Head'
import { Body } from './Body'
import { Picture } from './Picture'

export const Card = ({item}) => {
  return (
    <div className="h-96 rounded-xl overflow-hidden bg-light-surface-container-high dark:bg-dark-surface-container-high">
        <Head item ={item}/>
        <Body item={item}/>
        <Picture/>
    </div>
  )
}

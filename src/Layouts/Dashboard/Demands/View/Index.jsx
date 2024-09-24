import React from 'react'
import { IconButton } from '../../../../DevScript/Buttons/IconButton'
import { View } from 'lucide-react'
import { showModal } from '../../../../helpers/Dom/modal'
import { Modal } from '../../../../DevScript/Modal/Modal'
import { ViewItem } from './ViewItem'

export const ViewDemand = ({item}) => {
  return (
   <>
        <IconButton onClick={()=>{showModal(`ViewDemand${item.id}`)}} className='text-green-600 dark:text-green-400'>
          <View/>
        </IconButton>
        <Modal id={`ViewDemand${item.id}`}>
          <ViewItem item={item}/>
        </Modal>
   </>
  )
}

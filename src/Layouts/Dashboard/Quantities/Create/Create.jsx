import React from 'react'
import { FilledButton } from '../../../../DevScript/Buttons/FilledButton'
import { OutlineButton } from '../../../../DevScript/Buttons/OutlineButton'
import { Modal } from '../../../../DevScript/Modal/Modal'
import { CreateOne } from './CreateOne'
import { showModal } from '../../../../helpers/Dom/modal'

export const Create = () => {
  return (
    <div className='flex gap-4'>
        <FilledButton onClick={()=>{showModal('CreateOffice')}}>إنشاء طلب</FilledButton>
        <Modal id='CreateOffice'>
            <CreateOne/>
        </Modal>
    </div>
  )
}

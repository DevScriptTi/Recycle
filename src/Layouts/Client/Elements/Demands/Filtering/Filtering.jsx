import React, { useEffect, useState } from 'react'
import { Modal } from '../../../../../DevScript/Modal/Modal'
import { FilterItem } from './FilterItem'
import { Filter, FilterX } from 'lucide-react'
import { showModal } from '../../../../../helpers/Dom/modal'
import { useLocation } from 'react-router-dom'

export const Filtering = () => {
    const location = useLocation()
    const [filtred , setFiltred] = useState(location.search != '');
    useEffect(()=>{
        location.search != '' ? setFiltred(true) : setFiltred(false) 
    },[location])
  return (
    <div
        className='flex mt-3 px-6'
    >
        <button onClick={()=>{showModal('FilterDemand')}} className={`flex gap-2 ${filtred && 'text-light-primary dark:text-dark-primary'}`} >
            <span>فلترة</span>
            {filtred ? (<FilterX/>):(<Filter/>)}
        </button>
        <Modal id='FilterDemand'>
            <FilterItem/>
        </Modal>
    </div>
  )
}

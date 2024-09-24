import { useSelector } from "react-redux"

export const isAuth = () => {
    const user = useSelector(state=>state.user);  
    if (Object.keys(user.user).length === 0) {
        return false
    }else{
        return true
    }
}


export const isAdmin = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'admin') {
        return true
    }else{
        return false
    }
}


export const isVendor = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'vendor') {
        return true
    }else{
        return false
    }
}

export const isCollCompany = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'collCompany') {
        return true
    }else{
        return false
    }
}

export const isRecyCompany = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'recyCompany') {
        return true
    }else{
        return false
    }
}

export const isUser = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'user') {
        return true
    }else{
        return false
    }
}

export const isShipper = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'shipper') {
        return true
    }else{
        return false
    }
}

export const isOffice = () => {
    const user = useSelector(state=>state.user);  
    if (user.type === 'office') {
        return true
    }else{
        return false
    }
}


export const getType = () => {
    const user = useSelector(state=>state.user);  
    return user.type 
}

export const getUserLocation = () => {
    const user = useSelector(state=>state.user);  
    return {lat : user.user?.location?.lat ?? 16.936630166667 , lng : user.user?.location?.lng ?? 25.936630166667} 
}

export const getLocator = ()=>{
    const user = useSelector(state=>state.user);  
    
    if (user.type === 'vendor') {
        return 'vendors' ;
    } else if(user.type === 'shipper'){
        return 'shippers';
    } else if(user.type === 'office'){
        return 'offices';
    }

    return '';

}
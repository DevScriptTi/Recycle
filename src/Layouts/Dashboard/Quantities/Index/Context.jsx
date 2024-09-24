import { Children, createContext, useContext, useState } from "react";


export const OrderRequestContext = createContext({requests:[], setRequests:()=>{} , currentReq:[], setCurrentReq:()=>{}});

export const OrderRequestProvider = ({children})=>{
    const [requests, setRequests] = useState([]);
    const [currentReq, setCurrentReq] = useState();
    return <OrderRequestContext.Provider value={{requests, setRequests,currentReq, setCurrentReq}}>
        {children}
    </OrderRequestContext.Provider>
}
export const useOrderRequest = ()=>{
    let context = null;
    try {
       return  context = useContext(OrderRequestContext)
    } catch (error) {
        Error('You have to use useOrderRequest in OrderRequestContext propo');
    }
}
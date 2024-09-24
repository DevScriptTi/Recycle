import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDemande } from "../../../../Http/Requests/main/getDemands";
import { Card } from "./Card/Card";
import { Filtering } from "./Filtering/Filtering";
import { setDemands } from "../../../../StateManagement/Slices/newSlices/DemandsSlices/DemandsSlices";

export const Demand = ()=>{
    const demands = useSelector(state=>state.demands)
    const location = useLocation()
    const dispatch = useDispatch();
    useEffect(() => {
      async function getData() {
        const data = await getDemande(location.search);
        console.log(location.search)
        dispatch(setDemands(data));
      }
      getData();
      console.log()
    },[location]);
    return (
      <div className="flex flex-col gap-10 text-light-on-surface dark:text-dark-on-surface">
        <Filtering/>
        <div className="grid grid-cols-resizeDemand gap-5 px-6">
          {
              demands.data.map(item=>(
                  <Card key={item.id} item={item}/>
              ))
          }
        </div>
      </div>
    ) 
  }
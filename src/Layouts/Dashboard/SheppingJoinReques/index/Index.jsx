import React, { useEffect, useState } from "react";
import { DashboardContent } from "../../DashboardContent";
import { Stat } from "./Stat";
import { Filter } from "./Filter";
import { ItemsTable } from "./ItemsTable";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../Http/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "../../LocalComponenet/Pagination/Pagination";
import { ItemsTableFetch } from "./ItemsTableFetch";
import { PaginationFetch } from "../../LocalComponenet/Pagination/PaginationFetch";
import { setShipppersJoinRequests } from "../../../../StateManagement/Slices/ShippersJoinRequestsSlices/ShippersJoinRequestsSlices";

export const ShippersJoinRequestIndex = () => {
  const shippersjoinRequests = useSelector((state) => state.shippersJoinRequests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showContent, setShowContent] = useState(false);

  const getData = async () => {
    try {
      setShowContent(false);
      console.log('fetching data ....')
      const response = await axiosClient(`api/recy-companies/requests?${location.search}`);
      console.log('data fetched ' , response)
      dispatch(setShipppersJoinRequests(response.data));
      setShowContent(true);
      console.log("Response received:", response.data);
    } catch (error) {
      console.log('errors' , error)
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
  }, [location.search]);
  return (
    <DashboardContent title={"طلبات إنضمام شركات الرسكلة"}>
      <div className="flex flex-col gap-10 w-full">
        <Stat number={shippersjoinRequests.total}/>
        <div className="flex flex-col gap-6 w-full">
          <Filter />
          {showContent ? <ItemsTable data={shippersjoinRequests} /> : <ItemsTableFetch/>}
          {showContent ? <Pagination links={shippersjoinRequests.links?.slice(1,shippersjoinRequests.links?.length - 1)} to="dashboard/shippersJoinRequests" /> : <PaginationFetch/>}
        </div>
      </div>
    </DashboardContent>
  );
};

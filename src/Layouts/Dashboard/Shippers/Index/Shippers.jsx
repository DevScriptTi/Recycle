import React, { useEffect, useState } from "react";
import { DashboardContent } from "../../DashboardContent";
import { Filter } from "./Filter";
import { ItemsTable } from "./ItemsTable";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../Http/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "../../LocalComponenet/Pagination/Pagination";
import { ItemsTableFetch } from "./ItemsTableFetch";
import { PaginationFetch } from "../../LocalComponenet/Pagination/PaginationFetch";
import { setVendors } from "../../../../StateManagement/Slices/VendorsSlices/VendorsSlices";
import { Stat } from "./Stat";
import { User } from "lucide-react";
import { setWilayas } from "../../../../StateManagement/Slices/Extras/WilayasSlice";

export const Shippers = () => {
  const vendors = useSelector((state) => state.vendors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showContent, setShowContent] = useState(false);

  const getWilayas = async () => {
    try {
      const { data } = await axiosClient("api/wilayas");
      dispatch(setWilayas(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      setShowContent(false);
      const response = await axiosClient(`api/recy-companies?${location.search}`);
      dispatch(setVendors(response.data));
      setShowContent(true);
      console.log("Response received:", response.data);
    } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getWilayas();
    getData();
  }, [location.search]);
  return (
    <DashboardContent title={"شركات الرسكلة"}>
      <div className="flex flex-col gap-10 w-full">
        <Stat number={vendors.total} text="عدد شركات الرسكلة" icon={<User size={50}/>}/>
        <div className="flex flex-col gap-6 w-full">
          <Filter />
          {showContent ? <ItemsTable data={vendors} /> : <ItemsTableFetch/>}
          {showContent ? <Pagination links={vendors.links?.slice(1,vendors.links?.length - 1)} to="dashboard/vendors" /> : <PaginationFetch/>}
        </div>
      </div>
    </DashboardContent>
  );
};

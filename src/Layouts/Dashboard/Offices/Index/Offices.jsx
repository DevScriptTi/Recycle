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
import { Stat } from "./Stat";
import { User } from "lucide-react";
import { Create } from "../Create/Create";
import { setOffices } from "../../../../StateManagement/Slices/Offices/OfficesSlices";
import { setWilayas } from "../../../../StateManagement/Slices/Extras/WilayasSlice";

export const Offices = () => {
  const offices = useSelector((state) => state.offices);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showContent, setShowContent] = useState(false);

  const getWilayas = async () => {
    try {
      const { data } = await axiosClient("api/wilayas");
      console.log('wilayas fetched' , data.data);

      dispatch(setWilayas(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      setShowContent(false);
      const response = await axiosClient(`api/offices?${location.search}`);
      console.log('offices fetched' , response.data);
      dispatch(setOffices(response.data));
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
    <DashboardContent title={"المكاتب"}>
      <div className="flex flex-col gap-10 w-full">
        <Stat number={offices.total} text="عدد المكاتب" icon={<User size={50}/>}/>
        <Create/>
        <div className="flex flex-col gap-6 w-full">
          <Filter />
          {showContent ? <ItemsTable data={offices} /> : <ItemsTableFetch/>}
          {showContent ? <Pagination links={offices.links?.slice(1,offices.links?.length - 1)} to="dashboard/offices" /> : <PaginationFetch/>}
        </div>
      </div>
    </DashboardContent>
  );
};

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
import { getType, isOffice, isVendor } from "../../../../helpers/Algo/Auth";
import { Create } from "../Create/Create";
import { setWilayas } from "../../../../StateManagement/Slices/Extras/WilayasSlice";
import { Map } from "./Map";
import { setDemands } from "../../../../StateManagement/Slices/newSlices/DemandsSlices/DemandsSlices";
import { getSparePartCategories } from "../../../../Http/Requests/extra/SparePartCategories";
import { setSparePartCategories } from "../../../../StateManagement/Slices/Extras/SparePartCategoriesSlices";

export const Demands = () => {
  const demands = useSelector((state) => state.demands);
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
      const response = await axiosClient(`api/mydemands?${location.search}`);
      dispatch(setDemands(response.data));
      setShowContent(true);
    } catch (error) {
      console.log(error)
      // navigate("/error");
    }
  };
  useEffect(() => {
    getData()
    async function getData_() {
      const data = await getSparePartCategories();
      dispatch(setSparePartCategories(data.data));
    }
    getData_();
  }, [location.search]);
  return (
    <DashboardContent title={"قائمة الطلبات"}>
      <div className={`flex flex-col  gap-10 w-full`}>
        <div className="flex justify-between flex-col  items-center lg:items-start gap-8">
          <div className="flex flex-col gap-6 item-center lg:item-start">
            <Stat
              number={demands.total}
              text="عدد الطلبات"
              icon={<User size={50} />}
            />
            <Create />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <Filter />
          {showContent ? <ItemsTable data={demands} /> : <ItemsTableFetch />}
          {showContent ? (
            <Pagination
              links={demands.links?.slice(1, demands.links?.length - 1)}
              to="dashboard/demands"
            />
          ) : (
            <PaginationFetch />
          )}
        </div>
      </div>
    </DashboardContent>
  );
};

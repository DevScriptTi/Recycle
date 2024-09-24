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
import { List } from "lucide-react";
import { Create } from "../create/Create";
import { isAdmin } from "../../../../helpers/Algo/Auth";
import { setSparePartCategories } from "../../../../StateManagement/Slices/Extras/SparePartCategoriesSlices";
import { setSparePartsPagination } from "../../../../StateManagement/Slices/newSlices/SparePartsPagination/SparePartsPaginationSlices";
import { getSparePartCategories } from "../../../../Http/Requests/extra/SparePartCategories";

export const SpareParts = () => {
  const spareParts = useSelector((state) => state.SparePartsPagination);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showContent, setShowContent] = useState(false);

  
  const getData = async () => {
    try {
      setShowContent(false);
      const response = await axiosClient(`api/spareParts?${location.search}`);
      dispatch(setSparePartsPagination(response.data));
      setShowContent(true);
     } catch (error) {
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
    const getData_ = async ()=>{
      const data = await getSparePartCategories()
      dispatch(setSparePartCategories(data.data))
    }
    getData_()
  }, [location.search]);
  return (
    <DashboardContent title={"منتجات مصدرية"}>
      <div className="flex flex-col gap-10 w-full">
        <Stat number={spareParts.total} text="عدد منتجات مصدرية" icon={<List size={50}/>}/>
        <div className="flex flex-col gap-6 w-full">
          <Create/>
          <Filter />
          {showContent ? <ItemsTable data={spareParts} /> : <ItemsTableFetch/>}
          {showContent ? <Pagination links={spareParts.links?.slice(1,spareParts.links?.length - 1)} to="dashboard/refrences" /> : <PaginationFetch/>}
        </div>
      </div>
    </DashboardContent>
  );
};

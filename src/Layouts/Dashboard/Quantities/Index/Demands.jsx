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
import { setOrders } from "../../../../StateManagement/Slices/OrderSlices/OrdersSlices";

export const Orders = () => {
  const orders = useSelector((state) => state.orders);
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
      const response = await axiosClient(`api/orders?${location.search}`);
      dispatch(setOrders(response.data));
      setShowContent(true);
    } catch (error) {
      console.log(error)
      // navigate("/error");
    }
  };
  useEffect(() => {
    getData();
    getWilayas();
  }, [location.search]);
  return (
    <DashboardContent title={"الباعة"}>
      <div className={`flex flex-col  gap-10 w-full`}>
        <div className="flex justify-between flex-col  items-center lg:items-start gap-8">
          <div className={`relitive w-full lg:w-3/4 lg:mx-auto`}>
            <Map />
          </div>
          <div className="flex flex-col gap-6 item-center lg:item-start">
            <Stat
              number={orders.total}
              text="عدد الباعة"
              icon={<User size={50} />}
            />
            {( isVendor() || isOffice() ) && (<Create />)}
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <Filter />
          {showContent ? <ItemsTable data={orders} /> : <ItemsTableFetch />}
          {showContent ? (
            <Pagination
              links={orders.links?.slice(1, orders.links?.length - 1)}
              to="dashboard/orders"
            />
          ) : (
            <PaginationFetch />
          )}
        </div>
      </div>
    </DashboardContent>
  );
};

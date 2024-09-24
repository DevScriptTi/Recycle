import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Card } from "./Card/Card";
import { Filtering } from "./Filtering/Filtering";
import { getQuantities } from "../../../../Http/Requests/main/getQuantites";
import { setQuantities } from "../../../../StateManagement/Slices/newSlices/QuantitiesSlices/QuantitiesSlices";

export const Quantities = () => {
  const quantities = useSelector((state) => state.quantities);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      const data = await getQuantities(location.search);
      console.log(location.search);
      dispatch(setQuantities(data));
    }
    getData();
    console.log(quantities);
  }, [location]);
  return (
    <div>
      <Nav/>
      <div className="flex flex-col gap-10 text-light-on-surface dark:text-dark-on-surface">
        <Filtering />
        <div className="grid grid-cols-resizeDemand gap-5 px-6">
          {
            quantities.data.map(item=>(
                <Card key={item.id} item={item}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="px-6 h-11 flex items-center justify-start  text-light-on-surface dark:text-dark-on-surface  ">
      <Nav.Item to={"/"}>قطع غيار</Nav.Item>
      <Nav.Item to={"/primary"}>مواد أولية</Nav.Item>
    </div>
  );
};
Nav.Item = ({ children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "px-4 text-lable-small text-light-primary dark:text-dark-primary"
          : "px-4 text-lable-small"
      }
    >
      {children}
    </NavLink>
  );
};

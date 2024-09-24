import React, { useEffect, useState } from "react";
import { NavUppBar } from "../component/NavBars/NavUpBar/NavUppBar/NavUppBar";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosClient } from "../Http/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../StateManagement/Slices/UsersSlices/UserSlices";

export const Client = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("api/user");
        let data = {};
        data.token = token;
        data.data = response.data.data;
        data.type = response.data.type;
        dispatch(setUser(data));
        setShow(true);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    if (Object.keys(user.user).length === 0) {
      console.log("step 1");
      if (token) {
        fetchUser();
      } else {
        setShow(true)
      }
    } else {
      setShow(true);
    }
  },[show , navigate]);
  return (
    <>
      <NavUppBar />
      <Outlet />
    </>
  );
};

import { useDispatch } from "react-redux";
import { clearUser } from "../../../StateManagement/Slices/UsersSlices/UserSlices";
import { axiosClient } from "../../../Http/axiosClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Logout =  ({children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logingout , setLogingout] = useState(false)
  const logout = async () => {
    try {
      setLogingout(true)
      await axiosClient("api/logout");
      localStorage.removeItem("token");
      dispatch(clearUser({}));
      setLogingout(false)
    } catch (error) {
      setLogingout(false)
      console.log(error.response.data)
      navigate("/");
    }
  };

  return(
    <button  onClick={()=>{logout()}} className={`${logingout && 'animate-pulse'} text-title-large px-2 text-light-on-surface dark:text-dark-on-surface`}>
      {children}
    </button>
  )

};

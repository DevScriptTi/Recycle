import React, { useState } from "react";
import { axiosClient } from "../../../../Http/axiosClient";
import { CircleCheckBig } from "lucide-react";

export const Card = ({ order }) => {
  return (
    <div className="rounded-xl flex flex-col gap-7">
      <Card.Head order={order} />
      <Card.Body order={order} />
    </div>
  );
};

Card.Head = ({ order }) => {
  return (
    <div
      className={`flex justify-start gap-4 w-full font-["Cairo",_sans-serif]`}
    >
      <div className="size-12 rounded-full overflow-hidden">
        <img className="h-full" src="/public/assets/profile.jpg" alt="" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-title-medium font-bold">
          {order.order.vendor.name} {order.order.vendor.last}
        </h1>
        <span className="text-lable-large">
          {order.order.vendor.city.wilaya.name} -{order.order.vendor.city.name}
        </span>
      </div>
    </div>
  );
};

Card.Body = ({ order }) => {
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState(false);
  const getOrderToShepping = async (
    id,
  ) => {
    try {
      setConfirming(true);
      const response = await axiosClient(`api/orders/${order.order.id}/getOrderToShepping`);
      console.log(response.data)
      setConfirming(false);
      setMessage(true)
    } catch (error) {
      console.log(error);
    }
    return null;
  };
  return (
    <div className="flex flex-col items-start  w-full">
      {order.type == "collect" ? (
        <h1 className="text-title-large text-light-primary">طلب جمع</h1>
      ) : (
        <h1 className="text-title-large text-light-primary">طلب توصيل</h1>
      )}
      <div className="flex flex-col items-start">
        {/* <h3 className="text-title-medium m-0 p-0">المسافة بينكما 5.6 كم</h3> */}

        <p className="text-body-large m-0 p-0">رقم التأكيد {order.order.cheakNumber} </p>
        <p className="text-body-large m-0 p-0">إسم المنتج {order.order.productName} </p>
        <p className="text-body-large m-0 p-0">سعر الإجمالي {order.order.price} </p>
      </div>
      <div className="flex justify-between items-center w-full ">
        <button
          onClick={()=>{getOrderToShepping(order.order.id)}}
          className={`${
            confirming && "animate-pulse"
          } text-lable-large bg-light-primary text-light-on-primary rounded-2xl h-10 px-4 font-["Cairo",_sans-serif]`}
        >
          تكفل بإرساله
        </button>
        {message && (
          <span className={`text-body-large text-green-600 dark:text-green-400 font-bold flex gap-1  `}>
            <CircleCheckBig size={20} />
            <span className={`font-["Cairo",_sans-serif] text-lable-large`}>تمت العملية</span>
          </span>
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../Http/axiosClient";
import { Input } from "../../../../DevScript/FormElements/Inputs/Input";
import { Select } from "../../../../DevScript/FormElements/Select/Select";
import { FilledButton } from "../../../../DevScript/Buttons/FilledButton";
import { Modal } from "../../../../DevScript/Modal/Modal";
import { ArrowBigLeft, ArrowBigRight, CheckCircle } from "lucide-react";
import { showModal } from "../../../../helpers/Dom/modal";


export const ViewItem = ({ item }) => {
  return (
    <>
      <div className="flex items-start flex-col lg:flex-row px-10 py-8 rounded-xl bg-light-surface-container dark:bg-dark-surface-container text-light-on-surface dark:text-dark-on-surface">
        <ViewItem.Info>
          <ViewItem.Item title={"الحالة"}>{item.status}</ViewItem.Item>
          <ViewItem.Item title={"الوصف"}>{item.description}</ViewItem.Item>
          <ViewItem.Item title={"قطعة الغيار"}>
            {item.spare_part.name}
          </ViewItem.Item>
          <ViewItem.Item title={"نوع قطعة الغيار"}>
            {item.spare_part.spare_part_category.name}
          </ViewItem.Item>
        </ViewItem.Info>
        {/* <ViewItem.Image items={item?.picture} /> */}
      </div>
    </>
  );
};

ViewItem.Image = ({ items }) => {
  return (
    <div className="group size-96 relative overflow-hidden bg-light-surface-container-highest dark:bg-dark-surface-container-highest">
      {items.length > 0 && (
        <img
          className="w-full"
          src={`${import.meta.env.VITE_BACK_BASE_URL}/storage/${
            items[imageIndex].path
          }`}
          alt={`${items[imageIndex].path}`}
        />
      )}
      <div className="invisible group-hover:visible grid grid-cols-3 justify-items-center justify-center items-center  h-10 w-full text-light-on-surface dark:text-dark-on-surface bg-light-surface-container/50  dark:bg-dark-surface-container/50 absolute z-10 bottom-0 transition-all duration-200 ease-linear">
        {imageIndex > 0 && (
          <ArrowBigRight
            onClick={() => {
              setImageIndex(imageIndex - 1);
            }}
            className="fill-light-on-surface col-start-1  dark:fill-dark-on-surface"
            size={30}
          />
        )}
        <span className="text-title-large col-start-2 ">
          {imageIndex + 1} / {items.length}
        </span>
        {imageIndex  < items.length - 1 && (
          <ArrowBigLeft
            onClick={() => {
              setImageIndex(imageIndex + 1);
            }}
            className="fill-light-on-surface col-start-3  dark:fill-dark-on-surface"
            size={30}
          />
        )}
      </div>
    </div>
  );
};

ViewItem.Info = ({ children }) => {
  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-headline-large text-light-primary dark:text-dark-primary font-semibold">عرض بيانات المرجع</h1>
      <div className="w-96 grid grid-cols-2 gap-6">{children}</div>
    </div>
  );
};

ViewItem.Item = ({ children, title }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lable-large text-light-on-surface-variant dark:text-dark-on-surface-variant">
        {title}
      </h3>
      <span className="text-title-large">{children}</span>
    </div>
  );
};

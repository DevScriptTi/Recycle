import React from "react";

export const Head = ({ item }) => {
  return (
    <div className="flex justify-start">
      <div className="w-full flex items-center  gap-4 px-4 py-4">
        <div className="size-16 overflow-hidden rounded-full bg-light-surface-container-highest dark:bg-dark-surface-container-highest">
          {item.demandable.picture ? (
            <img className="rounded-full h-full" src="/public/assets/profile.jpg" alt="" />
          ) : (
            <img src="/public/assets/profile.jpg" alt="" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-title-medium">{item.demandable.CompanyName}</h1>
          <span className="text-lable-large  text-light-on-surface-variant dark:text-light-on-surface-variant">
            { item.demandable.city.wilaya.name} - {item.demandable.city.name}
          </span>
        </div>
      </div>
    </div>
  );
};

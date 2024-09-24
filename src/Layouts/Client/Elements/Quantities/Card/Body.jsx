import React from "react";

export const Body = ({item}) => {
  console.log(item.pricings[0]?.type)
  return (
    <div className="px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title-medium">محرك</h1>
        <p className="line-clamp-3 text-body-samll">
          {item.description}
        </p>
      </div>
      <div
        className=""
      >
        <span
            className="text-green-600 dark:text-green-400 font-semibold"
        >
            {item.pricings[0]?.price} ل {item.pricings[0]?.number} {item.pricings[0]?.type}
        </span> 
      </div>
    </div>

  );
};

import React from "react";
import { CardContext } from "./CardContext";
import { Menu } from "lucide-react";

export const Card = () => {
  return (
    <CardContext>
      <div className="flex flex-col  bg-light-surface-container-low dark:bg-dark-surface-container-low rounded-xl cursor-pointer overflow-hidden">
        <Card.Upp>
          <Card.Head>
            <Card.Save />
          </Card.Head>
          <Card.Info/>
          <Card.Pricing/>
        </Card.Upp>
        <Card.Image/>
      </div>
    </CardContext>
  );
};

Card.Upp = ({ children }) => {
  return <div className="flex flex-col gap-4 py-2 px-4">{children}</div>;
};

Card.Head = ({ children }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <span className="size-12 rounded-full overflow-hidden ">
          <img className="h-full" src="/public/vendor3.jpg" alt="profile" />
        </span>
        <div className="flex flex-col justify-between text-light-on-surface dark:text-dark-on-surface ">
          <h2 className="text-title-large">إسلام محمد</h2>
          <h4 className="text-lable-large">ام البواقي - عين مليلة</h4>
        </div>
      </div>
      <div className="relative group">
        <span className="py-2  text-light-on-surface dark:text-dark-on-surface ">
          <Menu />
        </span>
        <ul className="hidden group-hover:flex flex-col divide-y divide-light-outline-variant dark:divide-dark-outline-variant text-lable-large bg-light-surface-container-high dark:bg-dark-surface-container-high text-light-on-surface dark:text-dark-on-surface rounded-lg absolute bottom-2  left-0 translate-y-full">
          {children}
        </ul>
      </div>
    </div>
  );
};

Card.Save = () => {
  return <li className="px-4 h-8 flex items-center cursor-pointer">حفظ</li>;
};

Card.Info = () => {
  return (
    <div className="flex flex-col gap-3 text-light-on-surface dark:text-dark-on-surface">
      <h2 title="AIL AR LH CRETA" className="text-title-large line-clamp-1">AIL AR LH CRETA </h2>
      <span className="text-title-small">71503-A0C00</span>
    </div>
  );
};

Card.Pricing = () => {
  return (
    <div className="flex  gap-3  text-lable-large">
      <span className="text-red-800 dark:text-red-500">
        2200دينار \ للقطعة{" "}
      </span>
      <span className="text-light-on-surface dark:text-dark-on-surface">
        2200دينار \ للقطعة{" "}
      </span>
    </div>
  );
};

Card.Image = () => {
  return (
    <div className="h-80 w-full overflow-hidden object-contain">
      <img className="h-full" src="/public/product.png" alt="product" />
    </div>
  );
};

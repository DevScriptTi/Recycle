import React from "react";
import { DashboardContent } from "../DashboardContent";

export const Pricing = () => {
  return (
    <DashboardContent title={"التسعير"}>
      <div className="flex flex-col gap-7">
        <Pricing.Grid>
          <Pricing.Item title="سعر الثابت من كل طلبية"></Pricing.Item>
          <Pricing.Item></Pricing.Item>
          <Pricing.Item title="الحد الاعلى لوزن طلبية"></Pricing.Item>
          <Pricing.Item title="سعر كل كيلةغرام فوق الحد المسموح"></Pricing.Item>
          <Pricing.Item title="نسبة ارباح الشركة من عملية جمع"></Pricing.Item>
          <Pricing.Item title="نسبة ارباح الشركة من عملية توصيل"></Pricing.Item>
          <Pricing.Item title="نسبة ارباح الشركة من الموصلين"></Pricing.Item>
          <Pricing.Item title="نسبة ارباح المكتب الموصل"></Pricing.Item>
          <Pricing.Item title="نسبة ارباح المكتب المستلم"></Pricing.Item>
        </Pricing.Grid>
        <Pricing.Grid title="الثوابت الخاصة بعمليات السحب">
          <Pricing.Item title="عدد ايام الإنتضار لسحب بنسبة للموصلين"></Pricing.Item>
          <Pricing.Item title="عدد ايام الإنتضار لسحب بنسبة للباعة"></Pricing.Item>
        </Pricing.Grid>
      </div>
    </DashboardContent>
  );
};

Pricing.Grid = ({ children, title = "ثوابت خاصة بالتسعيرات" }) => {
  return (
    <div className="flex flex-col gap-4 text-light-primary dark:text-dark-primary font-semibold">
      <h1 className="text-headline-medium">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {children}
      </div>
    </div>
  );
};

Pricing.Item = ({
  children = "وصف شبه دقيق لهذه القيمة الثابة",
  price = "1.1",
  title = "سعر الكيلومتر الواحد",
}) => {
  return (
    <div className="flex flex-col gap-4 p-6 border border-light-outline dark:border-dark-outline rounded-2xl">
      <div className="text-title-large flex  gap-4">
        <h1 className="text-light-primary dark:text-dark-primary">{title}</h1>
        <span className="text-light-on-surface dark:text-dark-on-surface">
          {price} دينار
        </span>
      </div>
      <p className="text-body-large text-light-on-surface dark:text-dark-on-surface">
        {children}
      </p>
    </div>
  );
};

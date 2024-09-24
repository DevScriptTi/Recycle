import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select } from "../../../../../DevScript/FormElements/Select/Select";
import { FilledButton } from "../../../../../DevScript/Buttons/FilledButton";
import { setWilayas } from "../../../../../StateManagement/Slices/Extras/WilayasSlice";
import { getWilayas } from "../../../../../Http/Requests/extra/getWilayas";
import { useDispatch, useSelector } from "react-redux";
import { getSparePartCategories } from "../../../../../Http/Requests/extra/SparePartCategories";
import { setSparePartCategories } from "../../../../../StateManagement/Slices/Extras/SparePartCategoriesSlices";
import { useNavigate } from "react-router-dom";

export const FilterItem = () => {
  return (
    <div>
      <FilterItem.Card />
    </div>
  );
};

FilterItem.Card = () => {
  const sparePartCategories = useSelector((state) => state.sparePartCategories);
  const wilayas = useSelector((state) => state.wilayas);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();
  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data);
    let queryString = '/?';
    data.city_id ? queryString += `city_id=${data.city_id}&&` :  queryString ;
    data.status ? queryString += `status=${data.status}&&` :  queryString ;
    data.demandable_type ? queryString += `demandable_type=${data.demandable_type}&&` :  queryString ;
    data.spare_part_id ? queryString += `spare_part_id=${data.spare_part_id}&&` :  queryString ;
    console.log(queryString)
    navigate(`${queryString}`);
  };

  useEffect(() => {
    async function getData() {
      let data = await getWilayas();
      dispatch(setWilayas(data.data));
      data = await getSparePartCategories();
      dispatch(setSparePartCategories(data.data));
    }
    getData();

  }, []);

  return (
    <div
      className={`bg-light-surface dark:bg-dark-surface px-8 py-6 rounded-xl  `}
    >
      <form
        className={`${isSubmitting && "animate-pulse"} flex flex-col gap-8`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-title-large text-light-primary dark:text-dark-primary font-semibold text-start ">
          فلترة
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-6">
            <h3 className="text-title-small">الموقع</h3>
            <div className="flex gap-4">
              <Select
                title="الولاية"
                label="wilaya_id"
                placeholder=" إختر الولاية"
                register={register}
                error={errors.wilaya_id}
              >
                {wilayas?.map((item) => {
                  return (
                    <Select.Option
                      key={item.id}
                      option={item.name}
                      value={item.id}
                      label={"wilaya_id"}
                      setValue={setValue}
                    />
                  );
                })}
              </Select>
              {watch("wilaya_id") && (
                <Select
                  title="البلدية"
                  label="city_id"
                  placeholder=" إختر البلدية"
                  register={register}
                  error={errors.city_id}
                >
                  {wilayas[watch("wilaya_id") - 1].cities?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        option={item.name}
                        value={item.id}
                        label={"city_id"}
                        setValue={setValue}
                      />
                    );
                  })}
                </Select>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-title-small">نوع قطعة الغيار</h3>
            <div className="flex gap-4">
              <Select
                title="نوع قطعة الغيار"
                label="sparePartCategory_id"
                placeholder="إختر نوع قطعة الغيار"
                register={register}
                error={errors.sparePartCategory_id}
              >
                {sparePartCategories?.map((item) => {
                  return (
                    <Select.Option
                      key={item.id}
                      option={item.name}
                      value={item.id}
                      label={"sparePartCategory_id"}
                      setValue={setValue}
                    />
                  );
                })}
              </Select>
              {watch("sparePartCategory_id") && (
                <Select
                  title="قطعة الغيار"
                  label="spare_part_id"
                  placeholder=" إختر قطعة الغيار"
                  register={register}
                  error={errors.spare_part_id}
                >
                  {sparePartCategories[
                    watch("sparePartCategory_id") - 1
                  ].spare_parts?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        option={item.name}
                        value={item.id}
                        label={"spare_part_id"}
                        setValue={setValue}
                      />
                    );
                  })}
                </Select>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-title-small">الحالة</h3>
            <Select
              title="الحالة"
              label="status"
              placeholder=" إختر الحالة"
              register={register}
              error={errors.status}
            >
              <Select.Option
                option={"good"}
                value={"good"}
                label={"status"}
                setValue={setValue}
              />
              <Select.Option
                option={"tear"}
                value={"tear"}
                label={"status"}
                setValue={setValue}
              />
              <Select.Option
                option={"moderate-damage"}
                value={"moderate-damage"}
                label={"status"}
                setValue={setValue}
              />
              <Select.Option
                option={"severe-damage"}
                value={"severe-damage"}
                label={"status"}
                setValue={setValue}
              />
              <Select.Option
                option={"beyond-repair"}
                value={"beyond-repair"}
                label={"status"}
                setValue={setValue}
              />
            </Select>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-title-small">نوع للشركة</h3>

            <Select
              title="نوع للشركة"
              label="demandable_type"
              placeholder=" إختر نوع للشركة"
              register={register}
              error={errors.status}
            >
              <Select.Option
                option={"شركة جمع"}
                value={"collCompany"}
                label={"demandable_type"}
                setValue={setValue}
              />
              <Select.Option
                option={"شركة رسكلة"}
                value={"recyCompany"}
                label={"demandable_type"}
                setValue={setValue}
              />
            </Select>
          </div>
        </div>
        <div>
          <FilledButton type="submit">فلترة</FilledButton>
        </div>
      </form>
    </div>
  );
};

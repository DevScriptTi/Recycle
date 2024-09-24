import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select } from "../../../../../DevScript/FormElements/Select/Select";
import { FilledButton } from "../../../../../DevScript/Buttons/FilledButton";
import { setWilayas } from "../../../../../StateManagement/Slices/Extras/WilayasSlice";
import { getWilayas } from "../../../../../Http/Requests/extra/getWilayas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPrimaryMaterCategories } from "../../../../../Http/Requests/extra/PrimaryMaterCategories";
import { setPrimaryMaterCategories } from "../../../../../StateManagement/Slices/Extras/PrimaryMaterCategoriesSlices";

export const FilterItem = () => {
  return (
    <div>
      <FilterItem.Card />
    </div>
  );
};

FilterItem.Card = () => {
  const primaryMaterCategories = useSelector((state) => state.primaryMaterCategories);
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
    let queryString = '/primary?';
    data.city_id ? queryString += `city_id=${data.city_id}&&` :  queryString ;
    data.primary_mater_id ? queryString += `primary_mater_id=${data.primary_mater_id}&&` :  queryString ;
    console.log(queryString)
    navigate(`${queryString}`);
  };

  useEffect(() => {
    async function getData() {
      let data = await getWilayas();
      dispatch(setWilayas(data.data));
      data = await getPrimaryMaterCategories();
      dispatch(setPrimaryMaterCategories(data.data));
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
            <h3 className="text-title-small">نوع المادة الأولية</h3>
            <div className="flex gap-4">
              <Select
                title="نوع المادة الأولية"
                label="primaryMaterCategory_id"
                placeholder="إختر نوع المادة الأولية"
                register={register}
                error={errors.primaryMaterCategory_id}
              >
                {primaryMaterCategories?.map((item) => {
                  return (
                    <Select.Option
                      key={item.id}
                      option={item.name}
                      value={item.id}
                      label={"primaryMaterCategory_id"}
                      setValue={setValue}
                    />
                  );
                })}
              </Select>
              {watch("primaryMaterCategory_id") && (
                <Select
                  title="المادة الأولية"
                  label="primary_mater_id"
                  placeholder=" إختر المادة الأولية"
                  register={register}
                  error={errors.primary_mater_id}
                >
                  {primaryMaterCategories[
                    watch("primaryMaterCategory_id") - 1
                  ].primary_maters?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        option={item.name}
                        value={item.id}
                        label={"primary_mater_id"}
                        setValue={setValue}
                      />
                    );
                  })}
                </Select>
              )}
            </div>
          </div>
        </div>
        <div>
          <FilledButton type="submit">فلترة</FilledButton>
        </div>
      </form>
    </div>
  );
};

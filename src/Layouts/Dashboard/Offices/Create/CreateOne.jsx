import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../Http/axiosClient";
import { Input } from "../../../../DevScript/FormElements/Inputs/Input";
import { Select } from "../../../../DevScript/FormElements/Select/Select";
import { FilledButton } from "../../../../DevScript/Buttons/FilledButton";
import { Modal } from "../../../../DevScript/Modal/Modal";
import { CheckCircle } from "lucide-react";
import { showModal } from "../../../../helpers/Dom/modal";
import { addOffice } from "../../../../StateManagement/Slices/Offices/OfficesSlices";

export const CreateOne = () => {
  const wilayas = useSelector((state) => state.wilayas);
  const dispatch = useDispatch();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("api/offices", {
        name: data.name,
        address: data.address,
        vehicle_number: data.vehicle_number,
        email: data.email,
        phone: data.phone,
        city_id: data.city_id,
      });
      dispatch(addOffice(response.data.data));
      showModal("thankmessage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`${
          isSubmitting && "animate-pulse"
        } w-[400px] px-6 py-4 rounded-xl h-fit flex items-center overflow-auto bg-light-surface-container dark:bg-dark-surface-container-high`}
      >
        <div className="w-full flex flex-col gap-8 ">
          <h1 className="w-fit m-auto  text-headline-large font-bold text-light-primary dark:text-dark-primary">
            إنشاء منتج مصدري
          </h1>
          <form
            className="min-w-[350px] max-w-[700px] max-sm:px-4 m-auto flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="name"
              title="اسم المكتب"
              placeholder="أدخل إسم اسم المكتب"
              register={register}
              error={errors.name}
            />
            <Input
              title="رقم الهاتف"
              label="phone"
              placeholder=" أدخل رقم الهاتف"
              register={register}
              error={errors.phone}
            />
            <Input
              title=" ( إختياري )  البريد الإلكتروني"
              label="email"
              placeholder=" أدخل البريد الإلكتروني"
              register={register}
              error={errors.email}
            />
            <Input
              title="العنوان"
              label="address"
              placeholder=" أدخل العنوان"
              register={register}
              error={errors.address}
            />
            <Input
              label="vehicle_number"
              title="عدد المراكب"
              placeholder="إختر عدد المراكب"
              register={register}
              error={errors.vehicle_number}
            />

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

            <div className="flex items-end h-20 ">
              <FilledButton>إضافة</FilledButton>
            </div>
            <Modal id="thankmessage">
              <div className="flex flex-col gap-6 bg-light-surface dark:bg-dark-surface py-6 px-4 rounded-lg">
                <div className="flex flex-col gap-3 items-center">
                  <h1 className="text-title-large text-light-primary dark:text-dark-primary font-bold">
                    تمت عملية الإضافة بنجاح
                  </h1>
                </div>
                <div className="flex justify-center text-green-700 dark:text-green-400">
                  <CheckCircle size={80} />
                </div>
              </div>
            </Modal>
          </form>
        </div>
      </div>
    </>
  );
};

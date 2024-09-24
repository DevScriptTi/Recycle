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
import { isVendor } from "../../../../helpers/Algo/Auth";
import { IconButton } from "../../../../DevScript/Buttons/IconButton";
import { addOrder } from "../../../../StateManagement/Slices/OrderSlices/OrdersSlices";
export const CreateOne = () => {
  const wilayas = useSelector((state) => state.wilayas);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const wilayaId = watch("wilaya_id");
  const cities = wilayaId ? wilayas[wilayaId - 1]?.cities : [];

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("api/orders", {
        name: data.name,
        last: data.last,
        phone: data.phone,
        email: data.email,
        city_id: data.city_id,
        sheppingType: data.sheppingType,
        productName: data.productName,
        productType: data.productType,
        weight: data.weight,
        price: data.price,
      });
      showModal("thankmessage");
      dispatch(addOrder(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`${
          isSubmitting && "animate-pulse"
        } w-[400px] px-6 py-4 rounded-xl h-fit flex items-center  bg-light-surface-container dark:bg-dark-surface-container-high`}
      >
        <div className="w-full flex flex-col gap-8">
          <h1 className="w-fit m-auto text-headline-large font-bold text-light-primary dark:text-dark-primary">
            إنشاء طلب
          </h1>
          <form
            className="min-w-[350px] max-w-[700px] max-sm:px-4 m-auto flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={`${step != 0 && "hidden"} flex flex-col gap-7`}>
              <h1 className="text-title-large text-light-secondary dark:text-dark-secondary">
                معلومات المنتج
              </h1>
              <div className="flex flex-col gap-6">
                <Input
                  label="productName"
                  title="اسم المنتج"
                  placeholder="أدخل إسم اسم المنتج"
                  register={register}
                  error={errors.productName}
                />
                <Input
                  label="weight"
                  title="الوزن (kg)"
                  placeholder=" أدخل الوزن (kg)"
                  register={register}
                  error={errors.weight}
                />
                <Input
                  label="price"
                  title="السعر (دينار)"
                  placeholder=" أدخل السعر (دينار)"
                  register={register}
                  error={errors.price}
                />
                {isVendor() && (
                  <div className="flex gap-4">
                    <Select
                      title="نوع التوصيل "
                      label="sheppingType"
                      placeholder=" إختر نوع التوصيل "
                      register={register}
                      error={errors.sheppingType}
                    >
                      <Select.Option
                        option={"جمع"}
                        value={"collect"}
                        label={"sheppingType"}
                        setValue={setValue}
                      />
                      <Select.Option
                        option={"يدوي"}
                        value={"manual"}
                        label={"sheppingType"}
                        setValue={setValue}
                      />
                    </Select>
                  </div>
                )}
                <div className="flex gap-4">
                  <Select
                    title="نوع المنتج "
                    label="productType"
                    placeholder=" إختر نوع المنتج "
                    register={register}
                    error={errors.productType}
                  >
                    <Select.Option
                      option={"هش"}
                      value={"fragile"}
                      label={"productType"}
                      setValue={setValue}
                    />
                    <Select.Option
                      option={"متين"}
                      value={"durable"}
                      label={"productType"}
                      setValue={setValue}
                    />
                  </Select>
                </div>
              </div>
            </div>

            <div className={`${step != 1 && "hidden"} flex flex-col gap-7`}>
              <h1 className="text-title-large text-light-secondary dark:text-dark-secondary">
                معلومات المستلم
              </h1>
              <div className="flex flex-col gap-6">
                <Input
                  label="last"
                  title="الإسم "
                  placeholder="أدخل الإسم  "
                  register={register}
                  error={errors.last}
                />
                <Input
                  label="name"
                  title="القب"
                  placeholder="أدخل القب"
                  register={register}
                  error={errors.name}
                />

                <Input
                  label="email"
                  title="البريد الإلكتروني"
                  placeholder="أدخل البريد الإلكتروني"
                  register={register}
                  error={errors.email}
                />
                <Input
                  label="phone"
                  title="اسم رقم الهاتف"
                  placeholder="أدخل   رقم الهاتف"
                  register={register}
                  error={errors.phone}
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
                  {wilayaId && (
                    <Select
                      title="البلدية"
                      label="city_id"
                      placeholder=" إختر البلدية"
                      register={register}
                      error={errors.city_id}
                    >
                      {cities?.map((item) => {
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
            </div>

            <div
              className={`flex ${
                step === 0 ? "justify-end" : "justify-between"
              }`}
            >
              {step > 0 && (
                <IconButton
                  className={"text-light-primary dark:text-dark-primary"}
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  <ArrowBigRight />
                </IconButton>
              )}
              {step < 1 && (
                <IconButton
                  className={"text-light-primary dark:text-dark-primary"}
                  onClick={() => setStep((prev) => prev + 1)}
                >
                  <ArrowBigLeft />
                </IconButton>
              )}
              {step === 1 && (
                <div className="justify-self-end">
                  <FilledButton type="submit">Submit</FilledButton>
                </div>
              )}
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

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
import { addDemand } from "../../../../StateManagement/Slices/newSlices/DemandsSlices/DemandsSlices";
export const CreateOne = () => {
  const sparePartCategories = useSelector((state) => state.sparePartCategories);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("api/demands", {
        status: data.status,
        description: data.description,
        spare_part_id: data.spare_part_id,
      });
      showModal("thankmessage");
      dispatch(addDemand(response.data.data));
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
                  label="description"
                  title="وصف الطلب"
                  placeholder="أكتب وصف الطلب"
                  register={register}
                  error={errors.description}
                />
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
            <div>
              <div className="justify-self-end">
                <FilledButton type="submit">Submit</FilledButton>
              </div>
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

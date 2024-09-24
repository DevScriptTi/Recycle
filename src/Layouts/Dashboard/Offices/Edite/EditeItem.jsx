import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../../../Http/axiosClient";
import { showModal } from "../../../../helpers/Dom/modal";
import { useEffect } from "react";
import { Input } from "../../../../DevScript/FormElements/Inputs/Input";
import { DatePicker } from "../../../../DevScript/FormElements/DatePicker/DatePicker";
import { Select } from "../../../../DevScript/FormElements/Select/Select";
import { FilledButton } from "../../../../DevScript/Buttons/FilledButton";
import { CheckCircle } from "lucide-react";
import { Modal } from "../../../../DevScript/Modal/Modal";
import { NavLink } from "react-router-dom";
import { setWilayas } from "../../../../StateManagement/Slices/Extras/WilayasSlice";
import { format } from "date-fns";
import { updateVendor } from "../../../../StateManagement/Slices/VendorsSlices/VendorsSlices";
import { updateOffice } from "../../../../StateManagement/Slices/Offices/OfficesSlices";

export const EditeItem = ({ item }) => {
  const wilayas = useSelector((state) => state.wilayas);
  const wilaya_id = `wilaya_id${item.id}`;
  const wilaya_id_helper = `wilaya_id${item.id}-helper`;
  const city_id = `city_id${item.id}`;
  const city_id_helper = `city_id${item.id}-helper`;
  const dispatch = useDispatch();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: item.name,
      last: item.last,
      [wilaya_id]: item.city.wilaya.id,
      [wilaya_id_helper]: item.city.wilaya.name,
      [city_id]: item.city.id,
      [city_id_helper]: item.city.name,
      address: item.address,
      vehicle_number: item.vehicle_number,
      phone: item.phone,
      email: item.email,
    },
  });

  const watch_wilaya_id  = watch(wilaya_id);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosClient.put(`api/offices/${item.id}`, {
        name: data.name,
        address: data.address,
        vehicle_number: data.vehicle_number,
        email: data.email,
        phone: data.phone,
        city_id: data[city_id],
      });
      console.log(response.data.data);
      dispatch(updateOffice(response.data.data));
      showModal(`thankmessage${item.id}`);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(error.response.data.message); //رقم سجل التجاري موجود مسبقا
        setError("nrc", {
          type: "server",
          message: error.response.data.message,
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        className={`bg-light-surface-container dark:bg-dark-surface-container  ${
          isSubmitting && "animate-pulse"
        } w-fit min-h-fit max-h-screen px-5 py-7 rounded-xl flex items-center overflow-y-auto`}
      >
        <div className="w-full flex flex-col gap-8 ">
          <h1 className="w-fit m-auto  text-headline-large font-bold text-light-primary dark:text-dark-primary">
            تعديل بيانات البائع
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
                label={wilaya_id}
                placeholder=" إختر الولاية"
                register={register}
                error={errors[wilaya_id]}
              >
                {wilayas?.map((item) => {
                  return (
                    <Select.Option
                      key={item.id}
                      option={item.name}
                      value={item.id}
                      label={wilaya_id}
                      setValue={setValue}
                    />
                  );
                })}
              </Select>
              {watch_wilaya_id && (
                <Select
                  title="البلدية"
                  label={city_id}
                  placeholder=" إختر البلدية"
                  register={register}
                  error={errors[city_id]}
                >
                  {wilayas[watch_wilaya_id - 1].cities?.map((item) => {
                    return (
                      <Select.Option
                        key={item.id}
                        option={item.name}
                        value={item.id}
                        label={city_id}
                        setValue={setValue}
                      />
                    );
                  })}
                </Select>
              )}
            </div>           
            <div className="flex items-end h-20 ">
              <FilledButton>تعديل</FilledButton>
            </div>
            <Modal id={`thankmessage${item.id}`}>
              <div className="flex flex-col gap-6 bg-light-surface dark:bg-dark-surface py-6 px-4 rounded-lg">
                <h1 className="text-title-large text-light-primary dark:text-dark-primary font-bold">
                  تمت عملية التعديل بنجاح
                </h1>
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

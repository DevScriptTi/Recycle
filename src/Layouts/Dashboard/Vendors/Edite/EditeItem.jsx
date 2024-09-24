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

export const EditeItem = ({ item }) => {
  const wilayas = useSelector((state) => state.wilayas);
  const dateOfBirth = `dateOfBirth${item.id}`;
  const dateOfBirth_day = `dateOfBirth${item.id}-day`;
  const dateOfBirth_day_helper = `dateOfBirth${item.id}-day-helper`;
  const dateOfBirth_year = `dateOfBirth${item.id}-year`;
  const dateOfBirth_year_helper = `dateOfBirth${item.id}-year-helper`;
  const dateOfBirth_month = `dateOfBirth${item.id}-month`;
  const dateOfBirth_month_helper = `dateOfBirth${item.id}-month-helper`;
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
      [dateOfBirth_day]: +format(item.dateOfBirth, "dd"),
      [dateOfBirth_day_helper]: format(item.dateOfBirth, "dd"),
      [dateOfBirth_year]: +format(item.dateOfBirth, "yyyy"),
      [dateOfBirth_year_helper]: format(item.dateOfBirth, "yyyy"),
      [dateOfBirth_month]: +format(item.dateOfBirth, "MM"),
      [dateOfBirth_month_helper]: format(item.dateOfBirth, "MM"),
      [wilaya_id]: item.city.wilaya.id,
      [wilaya_id_helper]: item.city.wilaya.name,
      [city_id]: item.city.id,
      [city_id_helper]: item.city.name,
      address: item.address,
      nrc: item.nrc,
      phone: item.phone,
      email: item.email,
    },
  });

  const watch_wilaya_id = watch(wilaya_id);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosClient.put(`api/vendors/${item.id}`, {
        name: data.name,
        last: data.last,
        dateOfBirth: data[dateOfBirth],
        address: data.address,
        nrc: data.nrc,
        phone: data.phone,
        email: data.email,
        city_id: data[city_id],
      });
      console.log(response.data.data);
      dispatch(updateVendor(response.data.data));
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
            <div className="flex gap-4 ">
              <Input
                label="last"
                title="الإسم"
                placeholder="أدخل إسمك"
                register={register}
                error={errors.last}
              />
              <Input
                label="name"
                title="القب"
                placeholder="أدخل لقبك"
                register={register}
                error={errors.name}
              />
            </div>
            <DatePicker
              label={dateOfBirth}
              title="تاريخ الميلاد"
              register={register}
              error={errors[dateOfBirth]}
              setValue={setValue}
              watch={watch}
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
            <Input
              title="رقم الهاتف"
              label="phone"
              placeholder=" أدخل رقم الهاتف"
              register={register}
              error={errors.phone}
            />
            <div className="flex gap-4 ">
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
            </div>
            <Input
              title="رقم السجل التجاري"
              label="nrc"
              placeholder=" أدخل رقم السجل التجاري"
              register={register}
              error={errors.nrc}
            />
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

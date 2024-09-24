import React, { useEffect, useState } from "react";
import { Table } from "../../../../DevScript/Table/Table";
import { IconButton } from "../../../../DevScript/Buttons/IconButton";
import { Building, Car, CheckCircle, Key, Plus, Trash2, X } from "lucide-react";
import { Delete } from "./Delete";
import { isOffice, isShipper, isVendor } from "../../../../helpers/Algo/Auth";
import { axiosClient } from "../../../../Http/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../../../StateManagement/Slices/OrderSlices/OrdersSlices";
import { Modal } from "../../../../DevScript/Modal/Modal";
import { showModal } from "../../../../helpers/Dom/modal";
import echo from "../../../../Sockets/Echo";

export const ItemsTable = ({ data }) => {
  const userId = useSelector((state) => state.user?.user?.key?.user?.id); // Access only the ID
  const dispatch = useDispatch();
  const [findingOfficeInit, setFindingOfficeInit] = useState(false);
  const [findingCollecterShipper, setFindingCollecterShipper] = useState(false);
  const isoffice = isOffice();
  const isvendor = isVendor();
  //   رقم التتبع
  // نوع التوصيل
  // إسم المنتج
  // الوزن
  // نوع المنتج
  // السعر الكلي
  // أجرة المكتب الموصل
  // أجرة المكتب المستلم
  // مبلغ المستحق للبائع
  // أجرة الموصل
  // أجرة الشركة
  // حالة احرة الموصل
  // حالة مبلغ البائع
  // رقم التأكد
  // حالة الطلب
  // الكتب الموصل
  // المكتب المستلم
  // الموصل
  // البائع
  // المستلم

  // ==============
  // الإسم
  // القب
  // البريد الإلكتروني
  // رقم الهاتف
  // =============
  useEffect(() => {
    if (!userId) return;

    console.log("Fetching CSRF cookie and subscribing to channel...");

    if (isvendor) {
      const channel = echo.private(`Get.Collector.Shipper.${userId}`);

      channel.subscribed(() => {
        console.log("Successfully subscribed to orderRequestCreated channel");
      });
  
      channel.listen('.get-collector-shipper', (data) => {
        console.log("Received Order Request Data:", data);
        dispatch(updateOrder(data.data));
      }).error((error) => {
        console.log("Error listening to order-request:", error);
      });
  
      return () => {
        console.log("Unsubscribing from channel...");
        echo.leave(`orderRequestCreated.${userId}`);
      };
    }
  }, [userId, dispatch]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Table.Th>المعرف</Table.Th>
            <Table.Th>رقم التتبع</Table.Th>
            <Table.Th>نوع التوصيل</Table.Th>
            <Table.Th>السعر الكلي</Table.Th>
            <Table.Th>رقم التأكد</Table.Th>
            <Table.Th>حالة الطلب</Table.Th>
            <Table.Th>المكتب الموصل</Table.Th>
            <Table.Th>المكتب المستلم</Table.Th>
            <Table.Th>الموصل اثناء الجمع</Table.Th>
            {isoffice && <Table.Th>الموصل اثناء التوصيل</Table.Th>}
            {!isvendor && <Table.Th>البائع</Table.Th>}
            <Table.Th>المستلم</Table.Th>
            <Table.Th> الإعدادات </Table.Th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item) => (
            <tr key={item.id}>
              <Table.Th>{item.id}</Table.Th>
              <Table.Td>{item.trackingNumber}</Table.Td>
              <Table.Td>{item.sheppingType}</Table.Td>
              <Table.Td>{item.price}</Table.Td>
              <Table.Td>{item.cheakNumber}</Table.Td>
              <Table.Td>{item.status}</Table.Td>
              <Table.Td>
                {item?.sender_office?.name ?? (
                  <IconButton
                    onClick={() => {
                      findeOffice(item.id, dispatch, setFindingOfficeInit);
                    }}
                    className={`${
                      findingOfficeInit && "animate-spin"
                    } text-indigo-600 dark:text-indigo-400`}
                  >
                    <Building size={40} />
                  </IconButton>
                )}
                <Modal id={`findingCollectorShipper${item.id}`}>
                  <div className="flex flex-col gap-6 bg-light-surface dark:bg-dark-surface py-6 px-4 rounded-lg">
                    <div className="flex flex-col gap-3 items-center">
                      <h1 className="text-title-large text-light-primary dark:text-dark-primary font-bold">
                        تمت عملية عملية البحث أنتطر الرد
                      </h1>
                    </div>
                    <div className="flex justify-center text-green-700 dark:text-green-400">
                      <CheckCircle size={80} />
                    </div>
                  </div>
                </Modal>
              </Table.Td>
              <Table.Td>
                {item?.recever_office?.name ?? (
                  <IconButton
                    onClick={() => {}}
                    className={"text-indigo-600 dark:text-indigo-400"}
                  >
                    <Building size={40} />
                  </IconButton>
                )}
              </Table.Td>
              <Table.Td>
                {item.shipper_collect?.name ?? (
                  <IconButton
                    onClick={() => {
                      findCollectShipper(
                        item.id,
                        dispatch,
                        setFindingCollecterShipper
                      );
                    }}
                    className={`${
                      findingCollecterShipper && "animate-spin"
                    } text-indigo-600 dark:text-indigo-400`}
                  >
                    <Car size={40} />
                  </IconButton>
                )}
              </Table.Td>
              {isoffice && (
                <Table.Td>
                  {item.shipper_deliver?.name ?? (
                    <IconButton
                      onClick={() => {}}
                      className={"text-indigo-600 dark:text-indigo-400"}
                    >
                      <Car size={40} />
                    </IconButton>
                  )}
                </Table.Td>
              )}
              {!isvendor && <Table.Td>{item.vendor?.name}</Table.Td>}
              <Table.Td>{item.user?.email}</Table.Td>
              <Table.Td>
                <div className="flex gap-2">
                  <Delete id={item.id} />
                  {item.sheppingType != "office" && (<X className="text-red-600 dark:text-red-400"/>)}
                </div>
              </Table.Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const findeOffice = async (id, dispatch = () => {}, setFindingOfficeInit) => {
  try {
    setFindingOfficeInit(true);
    const response = await axiosClient(`api/orders/${id}/findOffice`);
    dispatch(updateOrder(response.data.data));
    setFindingOfficeInit(false);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const findCollectShipper = async (
  id,
  dispatch = () => {},
  setFindingCollecterShipper
) => {
  try {
    setFindingCollecterShipper(true);
    const response = await axiosClient(`api/orders/${id}/findCollectShipper`);
    setFindingCollecterShipper(false);
    showModal(`findingCollectorShipper${id}`)
  } catch (error) {
    console.log(error);
  }
  return null;
};



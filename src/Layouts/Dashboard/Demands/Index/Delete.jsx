import React, { useState } from "react";
import { IconButton } from "../../../../DevScript/Buttons/IconButton";
import { CheckCheckIcon, Trash2 } from "lucide-react";
import { axiosClient } from "../../../../Http/axiosClient";
import { Modal } from "../../../../DevScript/Modal/Modal";
import { showModal } from "../../../../helpers/Dom/modal";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../../StateManagement/Slices/OrderSlices/OrdersSlices";
import { deleteDemand } from "../../../../StateManagement/Slices/newSlices/DemandsSlices/DemandsSlices";

export const Delete = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const Delete = async () => {
    try {
      setIsSubmitting(true);
      const response = await axiosClient.delete(`api/demands/${id}`);
      showModal(`deleteRequest${id}`);
      dispatch(deleteDemand(id))
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <IconButton
        className={`${
          isSubmitting && "animate-spin"
        } text-red-700 dark:text-red-400`}
        onClick={() => {
          Delete();
        }}
      >
        <Trash2 size={24} />
      </IconButton>
      <Modal id={`deleteRequest${id}`}>
        <div className="flex flex-col gap-4 items-center bg-light-surface dark:bg-dark-surface px-8 py-6 rounded-xl  ">
          <div className="flex gap-4">
            <span className="text-body-large">تم حذف الطلب</span>
            <span className="text-green-600 dark:text-green-400">
              <CheckCheckIcon size={34} />
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

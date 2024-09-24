import React, { useEffect, useState } from "react";
import { Table } from "../../../../DevScript/Table/Table";
import { Delete } from "./Delete";
import { isOffice, isShipper, isVendor } from "../../../../helpers/Algo/Auth";
import { useDispatch, useSelector } from "react-redux";
import { ViewDemand } from "../View/Index";

export const ItemsTable = ({ data }) => {
  const userId = useSelector((state) => state.user?.user?.key?.user?.id); // Access only the ID
  return (
    <>
      <Table>
        <thead>
          <tr>
            <Table.Th>المعرف</Table.Th>
            <Table.Th>الحالة</Table.Th>
            <Table.Th>الوصف</Table.Th>
            <Table.Th>حالة النشاط</Table.Th>
            <Table.Th>قطعة الغيار</Table.Th>
            <Table.Th>صنف قطعة الغيار</Table.Th>
            <Table.Th> الإعدادات </Table.Th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item) => (
            <tr key={item.id}>
              <Table.Th>{item.id}</Table.Th>
              <Table.Td>{item.status}</Table.Td>
              <Table.Td>{item.description}</Table.Td>
              <Table.Td>{item.activeStatus}</Table.Td>
              <Table.Td>{item.spare_part.name}</Table.Td>
              <Table.Td>{item.spare_part.spare_part_category.name}</Table.Td>
              <Table.Td>
                <div className="flex gap-2">
                  <Delete id={item.id} />
                  <ViewDemand item={item}/>
                </div>
              </Table.Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

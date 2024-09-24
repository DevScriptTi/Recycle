import React from "react";
import { Table } from "../../../../DevScript/Table/Table";
import { Delete } from "./Delete";

export const ItemsTable = ({ data }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Table.Th>المعرف</Table.Th>
          <Table.Th>المفتاح</Table.Th>
          <Table.Th>القب</Table.Th>
          <Table.Th>الإسم</Table.Th>
          <Table.Th> الإعدادات</Table.Th>
        </tr>
      </thead>
      <tbody>
        {data.data?.map((item) => (
          <tr key={item.id}>
            <Table.Th>{item.id}</Table.Th>
            <Table.Td>{item.key.value}</Table.Td>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.last}</Table.Td>
            <Table.Td>
              <div className="flex gap-2">
                <Delete id={item.id}/>
              </div>
            </Table.Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

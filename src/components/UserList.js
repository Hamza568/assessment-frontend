import React from "react";
import { Table } from "antd";

const UserList = ({ filteredUsers, columns, loadingTable }) => (
  <Table
    dataSource={filteredUsers}
    columns={columns}
    rowKey="id"
    loading={loadingTable}
  />
);

export default UserList;

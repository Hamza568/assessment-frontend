import React from "react";
import { Button } from "antd";

const UserItem = ({ record, handleEdit, handleDelete, loading }) => (
  <span key={record?.id}>
    <Button
      onClick={() => {
        console.log("Edit button clicked");
        handleEdit(record);
      }}
      style={{ marginRight: 10 }}
    >
      Edit
    </Button>
    <Button onClick={() => handleDelete(record?.id)} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </Button>
  </span>
);

export default UserItem;

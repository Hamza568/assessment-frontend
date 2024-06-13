import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser, addUser, editUser } from "./redux/actions/usersActions";
import UserList from "./components/UserList";
import UserItem from "./components/UserItem";
import { Button, notification } from "antd";
import EditUserModal from "./components/EditUserModal";
import CreateUserModal from "./components/CreateUserModal";
import SearchBar from "./components/SearchBar";

const App = ({ users, fetchUsers, deleteUser, addUser, editUser }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleAction = async (action, ...args) => {
    setLoading(true);
    setLoadingTable(true);
    try {
      await action(...args);
      notification.success({
        message: "Success",
        description: `${action.name} successful`,
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setLoadingTable(false);
    }
  };

  const handleDelete = (id) => handleAction(deleteUser, id);

  const handleCreate = (values) => {
    handleAction(addUser, values).then(() => setIsCreateModalVisible(false));
  };

  const handleEdit = async (values) => {
    setLoading(true);
    setLoadingTable(true);
    try {
      await editUser(editingUser.id, values);
      setIsEditModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.warn(error.message);
    } finally {
      setLoading(false);
      setLoadingTable(false);
    }
  };

  const handleSearch = (value) => {
    setLoadingTable(true);
    const filteredData = users.filter((user) =>
      user[searchType].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredData.length > 0 || value ? filteredData : users);
    setLoadingTable(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <UserItem
          record={record}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginLeft: 10 }}>
        <h1>Users</h1>
        <Button onClick={() => setIsCreateModalVisible(true)}>Add User</Button>
        <SearchBar setSearchType={setSearchType} searchType={searchType} handleSearch={handleSearch} />
      </div>
      <UserList filteredUsers={filteredUsers} columns={columns} loadingTable={loadingTable} />
      <EditUserModal
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingUser(null);
        }}
        onOk={handleEdit}
        user={editingUser}
        loading={loading}
      />
      <CreateUserModal
        visible={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
        }}
        onOk={handleCreate}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  fetchUsers,
  deleteUser,
  addUser,
  editUser,
})(App);

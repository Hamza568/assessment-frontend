import React from "react";
import { Modal, Form, Input } from "antd";

const CreateUserModal = ({ visible, onCancel, onOk, loading }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add User"
      open={visible}
      onCancel={onCancel}
      onOk={() => form
        .validateFields()
        .then(values => {
          form.resetFields();
          onOk(values);
        })
        .catch(info => {
          console.log('Validation Failed:', info);
        })}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email", type:"email" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;

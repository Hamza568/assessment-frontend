import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditUserModal = ({ visible, onCancel, onOk, user, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={() =>
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.log("Validation Failed:", info);
          })
      }
      confirmLoading={loading}
    >
      <Form form={form} initialValues={user || {}}>
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

export default EditUserModal;

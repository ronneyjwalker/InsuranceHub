import React from "react";
import {
  Collapse,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Table,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function ManageAdmin() {
  const { Panel } = Collapse;
  const [adminsList, setAdminsList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 8,
    },
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          className="btn btn-danger"
          type="danger"
          onClick={() => onDelete(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const onRegister = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/InsuranceHub/admin/create",
        {
          username: values.username,
          password: values.password,
          email: values.email,
          firstName: values.firstname,
          lastName: values.lastname,
          address: values.address,
          gender: values.gender,
          usertype: values.usertype,
          phoneNumber: values.phone,
        }
      );
      if (response.status === 200) {
        console.log("Admin successfully registered");
        fetchAdmins();
      } else {
        console.error("Admin registration failed");
      }
    } catch (error) {
      console.error("Error occurred during Admin registration:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/InsuranceHub/admin/admins"
      );
      if (response.status === 200) {
        console.log("Admins fetched successfully");
        messageApi.open({
          type: "success",
          content: "Admins fetched successfully!",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });

        const dataSource = response.data.map((admin, index) => ({
          key: `${index}`,
          username: admin.username || "",
          firstName: admin.adminFname || "",
          lastName: admin.adminLname || "",
          address: admin.adminAddress || "",
        }));

        setAdminsList(dataSource);
      } else {
        console.error("Admins fetch failed");
      }
    } catch (error) {
      console.error("Error occurred during fetching Admins:", error);
    }
  };

  const onDelete = (key) => {};
  return (
    <div>
      <Collapse accordion>
        <Panel header="Create Admins" key="createAdmins">
          <Form
            {...layout}
            name="register"
            initialValues={{
              remember: true,
              usertype: "ADMIN",
            }}
            onFinish={onRegister}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="firstname"
              label="First Name"
              tooltip="What is your first name?"
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last Name"
              tooltip="What is your last name?"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                <Select.Option value="MALE">male</Select.Option>
                <Select.Option value="FEMALE">female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="usertype" hidden="true">
              <Input type="text" />
            </Form.Item>

            <div className="row text-center">
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Panel>

        {adminsList && (
          <Panel header="Admin List" key="adminList">
            <Table dataSource={adminsList} columns={columns} />
          </Panel>
        )}
      </Collapse>
    </div>
  );
}

export default ManageAdmin;

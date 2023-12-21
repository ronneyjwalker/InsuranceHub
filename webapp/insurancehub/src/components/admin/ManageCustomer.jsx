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

function ManageCustomer() {
  const [messageApi, contextHolder] = message.useMessage();
  const [customersList, setCustomersList] = useState([]);

  const { Panel } = Collapse;

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

  useEffect(() => {
    fetchCustomers();
  }, []);

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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/InsuranceHub/admin/customers"
      );
      if (response.status === 200) {
        console.log("User successfully fetched");
        messageApi.open({
          type: "success",
          content: "Customers fetched successfully!",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });

        const dataSource = response.data.map((customer, index) => ({
          key: `${index}`,
          username: customer.username || "",
          firstName: customer.customerFname || "",
          lastName: customer.customerLname || "",
          phone: customer.phoneNumber || "",
          gender: customer.gender || "",
          address: customer.customerAddress || "",
        }));

        setCustomersList(dataSource);
      } else {
        console.error("Customers fetch failed");
      }
    } catch (error) {
      console.error("Error occurred during fetching customers:", error);
    }
  };

  const onRegister = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/InsuranceHub/user/create",
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
        console.log("User successfully registered");
        messageApi.open({
          type: "success",
          content: "User successfully registered",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
      } else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error occurred during user registration:", error);
    }
  };

  // Handler function for delete button click
  const onDelete = (key) => {
    // Handle deletion logic here using the key of the row to be deleted
  };
  return (
    <div>
      <Collapse accordion>
        <Panel header="Create Customers" key="createCustomers">
          <Form
            {...layout}
            name="register"
            initialValues={{
              remember: true,
              usertype: "CUSTOMER",
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
        {customersList.length > 0 && (
          <Panel header="Customer List" key="customerList">
            <Table dataSource={customersList} columns={columns} />
          </Panel>
        )}
      </Collapse>
    </div>
  );
}

export default ManageCustomer;

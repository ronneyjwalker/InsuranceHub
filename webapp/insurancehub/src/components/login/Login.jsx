import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import loginimg from "../../images/login/login.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../redux/features/authSlice";
import axios from "axios";
import moment from "moment";

function Login() {
  const [loginType, setLoginType] = useState("login");
  const [dob, setDateOfBirth] = useState("");

  const quoteData = useSelector((state) => state.quote);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginTypeClick = (type) => {
    setLoginType(type);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  scrollToTop();

  const onLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/InsuranceHub/login",
        {
          username: values.username,
          password: values.password,
          usertype: "CUSTOMER",
        }
      );

      if (response.status === 200) {
        console.log("User successfully logged in");
        dispatch(
          setLogin({
            user: response.data,
          })
        );
        if (Object.keys(quoteData.selectedquote).length) {
          navigate("/checkout");
        } else {
          navigate("/");
        }
      } else {
        console.error("Unauthorized");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle other errors
    }

    // console.log("Login values:", values);
    // dispatch(
    //   setLogin({
    //     user: {
    //       username: "ronak",
    //       firstname: "Ronak",
    //       lastname: "Jain",
    //       email: "rjain36@hawk.iit.edu",
    //       usertype: "CUSTOMER",
    //     },
    //   })
    // );
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
          phoneNumber: values.phoneNumber,
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
        setLoginType("login");
      } else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("Error occurred during user registration:", error);
    }
  };

  // delete values.confirm;
  // console.log("Register values:", values);
  // navigate("/");
  //   };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    // <div className="content">
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={loginimg} alt="Login Image" className="img-fluid" />
        </div>
        <div className="col-md-6 contents">
          <div className="row justify-content-center">
            {loginType === "login" && (
              <div className="col-md-8">
                <div className="mb-4">
                  <h3 className="text-end">Sign In</h3>
                </div>
                <Form
                  {...layout}
                  name="login"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onLogin}
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
                  <div className="row text-center">
                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Log in
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <p
                  className="fw-bold text-end"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLoginTypeClick("register")}
                >
                  Click here to Register
                </p>
              </div>
            )}
            {loginType === "register" && (
              <div className="col-md-8">
                <div className="mb-4">
                  <h3 className="text-end">Register</h3>
                </div>
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
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <InputNumber />
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
                    <DatePicker
                      value={dob}
                      onChange={(moment, dateString) => {
                        setDateOfBirth(dateString);
                      }}
                    />
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
                <p
                  className="fw-bold text-end"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLoginTypeClick("login")}
                >
                  Login Instead?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Login;

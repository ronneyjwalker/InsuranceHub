import React, { useState, useEffect } from "react";
import { Layout, Menu, Card, Row, Col, Table, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  InsuranceOutlined,
  CarOutlined,
  HomeOutlined,
  HeartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Content, Sider } = Layout;
const { Meta } = Card;

const CustomerHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("profile");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [subscribedPolicyDetails, setSubscribedPolicyDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const getCustomerDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/InsuranceHub/customer/${user.username}`
      );

      if (response.status === 200) {
        console.log(response.data);
        setCustomerDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/InsuranceHub/customer/transactions/${user.username}`
      );

      if (response.status === 200) {
        console.log(response.data);

        const formattedData = response.data.map((item) => ({
          date: item.date.substring(0, 10),
          amount: item.paymentAmt,
          paymentMethod: item.paymentMethod,
        }));

        setPaymentDetails(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getSubscribedPolicies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/InsuranceHub/customer/policies/${user.username}`
      );

      if (response.status === 200) {
        console.log(response.data);

        const typeMap = {
          auto: "Automobile",
          life: "Life",
          home: "Home",
        };

        const subscribedPolicies = [];

        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const policyType = typeMap[key];

            response.data[key].forEach((item) => {
              const formattedPolicy = {
                type: policyType,
                policyNumber:
                  item.automobilePolicyId ||
                  item.homePolicyId ||
                  item.healthPolicyId,
                premium: 500, // Static premium value
                coverageAmount: 10000, // Static coverage amount value
                deductible: 500, // Static deductible value
                expirationDate: "2023-12-31", // Static expiration date
              };

              subscribedPolicies.push(formattedPolicy);
            });
          }
        }

        setSubscribedPolicyDetails(subscribedPolicies);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
    if (menuItem.key === "paymentHistory" && paymentDetails == null) {
      getPaymentDetails();
    } else if (
      menuItem.key === "subscribedPolicies" &&
      subscribedPolicyDetails == null
    ) {
      getSubscribedPolicies();
    }
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  // const subscribedPolicies = [
  //   {
  //     type: "Automobile",
  //     policyNumber: "A123",
  //     premium: 500,
  //     coverageAmount: 10000,
  //     deductible: 500,
  //     expirationDate: "2023-12-31",
  //   },
  //   {
  //     type: "Home",
  //     policyNumber: "H456",
  //     premium: 800,
  //     coverageAmount: 200000,
  //     deductible: 1000,
  //     expirationDate: "2023-12-31",
  //   },
  //   {
  //     type: "Health",
  //     policyNumber: "H789",
  //     premium: 300,
  //     coverageAmount: 50000,
  //     deductible: 200,
  //     expirationDate: "2023-12-31",
  //   },
  // ];

  const columnsPaymentHistory = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
  ];

  const columnsSubscribedPolicies = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Policy Number", dataIndex: "policyNumber", key: "policyNumber" },
    { title: "Premium", dataIndex: "premium", key: "premium" },
    {
      title: "Coverage Amount",
      dataIndex: "coverageAmount",
      key: "coverageAmount",
    },
    { title: "Deductible", dataIndex: "deductible", key: "deductible" },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
    },
  ];

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "profile":
        return (
          <>
            {customerDetails && (
              <Card title="Profile">
                <Row gutter={16}>
                  <Col span={24}>
                    <Meta
                      avatar={
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                      }
                      title={`Username: ${customerDetails.user.username}`}
                      // description={`Customer since: January 2018`}
                    />
                  </Col>
                </Row>
                <Row gutter={16} className="mt-4">
                  <Col span={24}>
                    <div className="mb-3">
                      <strong>Email:</strong> {customerDetails.user.email}
                    </div>
                    <div className="mb-3">
                      <strong>Address:</strong>{" "}
                      {customerDetails.customer.customerAddress}
                    </div>
                    <div className="mb-3">
                      <strong>Gender:</strong> {customerDetails.customer.gender}
                    </div>
                    <div className="mb-3">
                      <strong>Firstname:</strong>{" "}
                      {customerDetails.customer.customerFname}
                    </div>
                    <div className="mb-3">
                      <strong>Lastname:</strong>{" "}
                      {customerDetails.customer.customerLname}
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong>{" "}
                      {customerDetails.customer.phoneNumber}
                    </div>
                    {/* <div className="mb-3">
                      <strong>Date of birth:</strong> {customerDetails.dob}
                    </div> */}
                  </Col>
                </Row>
              </Card>
            )}
          </>
        );
      case "subscribedPolicies":
        return (
          <>
            {subscribedPolicyDetails && (
              <Card title="Subscribed Policies">
                <Table
                  dataSource={subscribedPolicyDetails}
                  columns={columnsSubscribedPolicies}
                />
              </Card>
            )}
          </>
        );
      case "paymentHistory":
        return (
          <>
            {paymentDetails && (
              <Card title="Payment History">
                <Table
                  dataSource={paymentDetails}
                  columns={columnsPaymentHistory}
                />
              </Card>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: "80vh" }}>
      <Sider
        width={200}
        style={{ background: "#fff" }}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleMenu}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedMenuItem]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="subscribedPolicies" icon={<InsuranceOutlined />}>
            Subscribed Policies
          </Menu.Item>
          {/* <Menu.Item key="automobile">Automobile Policies</Menu.Item>
          <Menu.Item key="home">Home Policies</Menu.Item>
          <Menu.Item key="health">Health Policies</Menu.Item> */}
          <Menu.Item key="paymentHistory" icon={<HistoryOutlined />}>
            Payment History
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "24px" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomerHome;

import React from "react";
import { Collapse, Table, Form, Input, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Panel } = Collapse;

const allPoliciesColumns = [
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

const autoColumns = [
  {
    title: "Automobile Policy ID",
    dataIndex: "automobilePolicyId",
    key: "automobilePolicyId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Automobile Make",
    dataIndex: "automobileMake",
    key: "automobileMake",
  },
  {
    title: "Automobile Model",
    dataIndex: "automobileModel",
    key: "automobileModel",
  },
  {
    title: "Automobile Year",
    dataIndex: "automobileYear",
    key: "automobileYear",
  },
  {
    title: "VIN",
    dataIndex: "vin",
    key: "vin",
  },
  {
    title: "Driving License Number",
    dataIndex: "drivingLicenseNumber",
    key: "drivingLicenseNumber",
  },
  {
    title: "Automobile Usage",
    dataIndex: "automobileUsage",
    key: "automobileUsage",
  },
  {
    title: "Mileage",
    dataIndex: "mileage",
    key: "mileage",
  },
  {
    title: "License Plate Number",
    dataIndex: "licensePlateNumber",
    key: "licensePlateNumber",
  },
  {
    title: "Safety Features",
    dataIndex: "safetyFeatures",
    key: "safetyFeatures",
    render: (text) => (text ? "Yes" : "No"),
  },
];

const homeColumns = [
  {
    title: "Home Policy ID",
    dataIndex: "homePolicyId",
    key: "homePolicyId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Property Type",
    dataIndex: "propertyType",
    key: "propertyType",
  },
  {
    title: "Estimated Property Value",
    dataIndex: "estimatedPropertyValue",
    key: "estimatedPropertyValue",
  },
  {
    title: "Lease Agreement Details",
    dataIndex: "leaseAgreementDetails",
    key: "leaseAgreementDetails",
  },
  {
    title: "Has Pets",
    dataIndex: "hasPets",
    key: "hasPets",
    render: (text) => (text ? "Yes" : "No"),
  },
  {
    title: "Pet Details",
    dataIndex: "petDetails",
    key: "petDetails",
  },
  {
    title: "Number of Occupants",
    dataIndex: "numberOfOccupants",
    key: "numberOfOccupants",
  },
  {
    title: "Property Location",
    dataIndex: "propertyLocation",
    key: "propertyLocation",
  },
  {
    title: "Number of Bedrooms",
    dataIndex: "numberOfBedrooms",
    key: "numberOfBedrooms",
  },
  {
    title: "Number of Bathrooms",
    dataIndex: "numberOfBathrooms",
    key: "numberOfBathrooms",
  },
  {
    title: "Square Footage",
    dataIndex: "squareFootage",
    key: "squareFootage",
  },
];

const lifeColumns = [
  {
    title: "Health Policy ID",
    dataIndex: "healthPolicyId",
    key: "healthPolicyId",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Employment",
    dataIndex: "employement",
    key: "employement",
  },
  {
    title: "Height",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "Blood Group",
    dataIndex: "bloodGroup",
    key: "bloodGroup",
  },
  {
    title: "Dependent",
    dataIndex: "dependent",
    key: "dependent",
  },
  {
    title: "Annual Income",
    dataIndex: "annualIncome",
    key: "annualIncome",
  },
  {
    title: "Health History",
    dataIndex: "healthHistory",
    key: "healthHistory",
  },
  {
    title: "Smoking",
    dataIndex: "smoking",
    key: "smoking",
    render: (text) => (text ? "Yes" : "No"),
  },
];

const ManagePolicy = () => {
  const [policyList, setPolicyList] = useState(null);

  const [searchedPolicies, setSearchedPolicies] = React.useState([]);

  const [form] = Form.useForm();

  const handleSearch = async (values) => {
    try {
      console.log("Search username:", values.username);
      const response = await axios.get(
        `http://localhost:8080/InsuranceHub/customer/policies/${values.username}`
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
                premium: 500,
                coverageAmount: 10000,
                deductible: 500,
                expirationDate: "2023-12-31",
              };

              subscribedPolicies.push(formattedPolicy);
            });
          }
        }

        setSearchedPolicies(subscribedPolicies);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleClear = () => {
    form.resetFields();
    setSearchedPolicies([]);
  };

  useEffect(() => {
    getSubscribedPolicies();
  }, []);

  const getSubscribedPolicies = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/InsuranceHub/admin/policies`
      );

      if (response.status === 200) {
        console.log(response.data);
        setPolicyList(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <Collapse accordion>
      <Panel header="All Policies List" key="allPoliciesList">
        {policyList && (
          <div>
            <h2>Automobile Data</h2>
            <Table columns={autoColumns} dataSource={policyList.auto} />

            <h2>Home Data</h2>
            <Table columns={homeColumns} dataSource={policyList.home} />

            <h2>Life Data</h2>
            <Table columns={lifeColumns} dataSource={policyList.life} />
          </div>
        )}
      </Panel>
      <Panel header="Search Policy By Customer" key="searchPolicyByCustomer">
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
          style={{ marginBottom: "16px" }}
        >
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search Policy
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleClear} type="link">
              Clear
            </Button>
          </Form.Item>
        </Form>
        <Table
          className="mt-4"
          dataSource={searchedPolicies}
          columns={allPoliciesColumns}
        />
      </Panel>
    </Collapse>
  );
};

export default ManagePolicy;

import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  InputNumber,
  Checkbox,
  Slider,
  Radio,
  Card,
  Modal,
  message,
} from "antd";

import Recommender from "../openai/Recommender";
import Quotation from "./Quotation";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setQuotesData,
  setSelectedQuote,
  setRecommended,
  resetQuote,
  setFormType,
} from "../../redux/features/quoteSlice";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Homeform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.user);
  const recommended = useSelector((state) => state.quote.recommended);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  scrollToTop();

  const onFinish = async (values) => {
    console.log("Received values of form: ", JSON.stringify(values));
    dispatch(setFormType("home"));
    dispatch(setFormData(values));
    var packages = Quotation.getHomeQuote(values);
    setQuote(packages);
    dispatch(setQuotesData(packages));
    const pack = await Recommender.fetch(
      values,
      packages.Platinum,
      packages.Gold,
      packages.Silver,
      "home"
    );
    console.log(pack);

    let recommended = "";
    if (pack.toLowerCase().includes("gold")) {
      recommended = "Gold";
    } else if (pack.toLowerCase().includes("platinum")) {
      recommended = "Platinum";
    } else if (pack.toLowerCase().includes("silver")) {
      recommended = "Silver";
    }

    dispatch(setRecommended(recommended));
    showModal();
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const clearQuote = () => {
    setQuote({});
    form.resetFields();
    dispatch(resetQuote());
  };

  const renderQuotationCards = () => {
    if (quote) {
      return Object.keys(quote).map((key, index) => (
        <Card
          className="quote-card"
          key={index}
          title={key}
          style={{ width: 300, margin: "10px" }}
          onClick={() => handleQuoteCardClick(key)}
        >
          <p>{quote[key]}</p>
        </Card>
      ));
    }
    return null;
  };

  const handleQuoteCardClick = (selectedQuote) => {
    dispatch(setSelectedQuote(selectedQuote));

    if (!user) {
      message.warning("Please login first");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h2>Home Quote Form</h2>
      </div>
      {Object.keys(quote).length > 0 && (
        <>
          <div className="d-flex justify-content-center mb-4">
            <Button
              className="btn btn-primary me-2"
              type="primary"
              onClick={showModal}
            >
              Open Quotes
            </Button>
            <Button
              className="btn btn-outline-primary"
              type="primary"
              onClick={clearQuote}
            >
              Clear Quotes
            </Button>
          </div>
          <Modal
            title="Quotation Details"
            open={modalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <div className="row">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {renderQuotationCards()}
              </div>
            </div>
            {recommended !== "" && (
              <div className="row">
                <span>AI Recommendation from our side: {recommended} </span>
              </div>
            )}
          </Modal>
        </>
      )}
      <div className="row">
        <Form
          form={form}
          name="homeform"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Insurance Category"
            name="insuranceCategory"
            initialValue="home"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Estimated Property Value"
            name="propertyValue"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the estimated property value!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Pets" name="hasPets">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Lease Agreement Details" name="leaseDetails">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Number of Bathrooms"
            name="numBathrooms"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the number of bathrooms!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Number of Bedrooms"
            name="numBedrooms"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the number of bedrooms!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Number of Occupants"
            name="numOccupants"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the number of occupants!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Pets Details" name="petsDetails">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Property Location"
            name="propertyLocation"
            rules={[
              {
                required: true,
                message: "Please enter the property location!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Property Type"
            name="propertyType"
            rules={[
              { required: true, message: "Please enter the property type!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Property Square Feet"
            name="propertySquareFeet"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the property square feet!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Policy Tenure (years)"
            name="policyTenure"
            rules={[
              { required: true, message: "Please select the policy tenure!" },
            ]}
          >
            <Slider
              min={2}
              max={10}
              marks={{ 2: "2", 4: "4", 6: "6", 8: "8", 10: "10" }}
              step={null}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Homeform;

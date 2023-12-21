import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
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

const Lifeform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.user);
  const recommended = useSelector((state) => state.quote.recommended);

  const [messageApi, contextHolder] = message.useMessage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  scrollToTop();

  const onFinish = async (values) => {
    console.log("Received values of form: ", JSON.stringify(values));
    dispatch(setFormType("life"));
    dispatch(setFormData(values));
    var packages = Quotation.getLifeQuote(values);
    setQuote(packages);
    dispatch(setQuotesData(packages));
    const pack = await Recommender.fetch(
      values,
      packages.Platinum,
      packages.Gold,
      packages.Silver,
      "life"
    );

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

  const bloodGroups = [
    "APositive",
    "ANegative",
    "BPositive",
    "BNegative",
    "OPositive",
    "ONegative",
    "ABPositive",
    "ABNegative",
  ];

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
      messageApi.open({
        type: "warning",
        content: "Please login first",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="container" style={{ height: "160vh" }}>
      <div className="text-center mb-4">
        <h2>Life Quote Form</h2>
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
          name="lifeInsurancequotes"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Insurance Category"
            name="insuranceCategory"
            initialValue="life"
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
            label="Height (Feet)"
            name="height"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter your height in feet!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Weight (Pounds)"
            name="weight"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter your weight in pounds!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[
              { required: true, message: "Please select your blood group!" },
            ]}
          >
            <Select>
              {bloodGroups.map((group) => (
                <Option key={group} value={group}>
                  {group}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Type of Employment"
            name="employment"
            rules={[
              {
                required: true,
                message: "Please select your employment type!",
              },
            ]}
          >
            <Select>
              <Option value="fullTime">Full-Time</Option>
              <Option value="partTime">Part-Time</Option>
              <Option value="selfEmployed">Self-Employed</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Number of Dependents" name="dependent">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Annual Income" name="annualIncome">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Medical History" name="healthHistory">
            <Input />
          </Form.Item>

          <Form.Item label="Smoking" name="smoking">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Lifeform;

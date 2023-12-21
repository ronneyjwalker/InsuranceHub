import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Card,
  Button,
  InputNumber,
  Modal,
  message,
  Radio,
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

const AutoForm = ({ vehicleType }) => {
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

  const automobileUsage = ["PERSONAL", "COMMERCIAL"];

  const onFinish = async (values) => {
    console.log("Received values of form: ", JSON.stringify(values));
    dispatch(setFormType("auto"));
    dispatch(setFormData(values));
    if (vehicleType === "car") {
      var carpackages = Quotation.getCarQuote(values);
      setQuote(carpackages);
      dispatch(setQuotesData(carpackages));
      const carpack = await Recommender.fetch(
        values,
        carpackages.Platinum,
        carpackages.Gold,
        carpackages.Silver,
        "auto"
      );
      console.log(carpack);

      let recommended = "";
      if (carpack.toLowerCase().includes("gold")) {
        recommended = "Gold";
      } else if (carpack.toLowerCase().includes("platinum")) {
        recommended = "Platinum";
      } else if (carpack.toLowerCase().includes("silver")) {
        recommended = "Silver";
      }

      dispatch(setRecommended(recommended));
      showModal();
    }

    if (vehicleType === "motorcycle") {
      var motorcyclepackages = Quotation.getMotorcycleQuote(values);
      setQuote(motorcyclepackages);
      dispatch(setQuotesData(motorcyclepackages));
      const motorpack = await Recommender.fetch(
        values,
        motorcyclepackages.Platinum,
        motorcyclepackages.Gold,
        motorcyclepackages.Silver,
        "auto"
      );
      console.log(motorpack);

      let recommended = "";
      if (motorpack.toLowerCase().includes("gold")) {
        recommended = "Gold";
      } else if (motorpack.toLowerCase().includes("platinum")) {
        recommended = "Platinum";
      } else if (motorpack.toLowerCase().includes("silver")) {
        recommended = "Silver";
      }

      dispatch(setRecommended(recommended));
      showModal();
    }
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
        <h2>{vehicleType === "car" ? "Car" : "Motorcycle"} Quote Form</h2>
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
          name="autoForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Insurance Category"
            name="insuranceCategory"
            initialValue={vehicleType}
          >
            {vehicleType === "motorcycle" && <Input disabled />}
            {vehicleType === "car" && <Input disabled />}
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
            label="Automobile Usage"
            name="automobileUsage"
            rules={[
              {
                required: true,
                message: "Please select your Automobile Usage!",
              },
            ]}
          >
            <Select>
              {automobileUsage.map((group) => (
                <Option key={group} value={group}>
                  {group}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Driving License Number"
            name="drivingLicenseNumber"
            rules={[
              {
                required: true,
                message: "Please enter the driving license number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="License Plate Number"
            name="licensePlateNumber"
            rules={[
              {
                required: true,
                message: "Please enter the license plate number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mileage"
            name="mileage"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the mileage!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Safety Features" name="safetyFeatures">
            <Radio.Group>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="VIN"
            name="vin"
            rules={[{ required: true, message: "Please enter the VIN!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Automobile Make"
            name="automobileMake"
            rules={[
              { required: true, message: "Please enter the automobile make!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Automobile Model"
            name="automobileModel"
            rules={[
              { required: true, message: "Please enter the automobile model!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Automobile Year"
            name="automobileYear"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the automobile year!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          {vehicleType === "car" && (
            <Form.Item
              label="Number of Doors"
              name="numDoors"
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please enter the number of doors!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          )}

          {vehicleType === "motorcycle" && (
            <Form.Item
              label="Motorcycle Type"
              name="motorcycleType"
              rules={[
                {
                  required: true,
                  message: "Please enter the motorcycle type!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}

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

export default AutoForm;

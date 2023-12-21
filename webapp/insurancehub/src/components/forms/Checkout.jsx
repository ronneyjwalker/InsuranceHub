import { useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const formData = useSelector((state) => state.quote.form);
  const quotesData = useSelector((state) => state.quote.quotes);
  const selectedQuote = useSelector((state) => state.quote.selectedquote);
  const recommendedPackage = useSelector((state) => state.quote.recommended);
  const selectedFormType = useSelector((state) => state.quote.formType);
  const user = useSelector((state) => state.auth.user);

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const renderData = () => {
    return (
      <>
        <strong className="row mb-2">Personal Data:</strong>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            First Name:
          </Col>
          <Col xs={8}>{formData["firstName"]}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            Last Name:
          </Col>
          <Col xs={8}>{formData["lastName"]}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            Address:
          </Col>
          <Col xs={8}>{formData["address"]}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            Email:
          </Col>
          <Col xs={8}>{formData["email"]}</Col>
        </Row>
        <hr />
        <strong className="row mb-2">Available Quotes:</strong>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            Platinum:
          </Col>
          <Col xs={8}>{quotesData["Platinum"]}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            Gold:
          </Col>
          <Col xs={8}>{quotesData["Gold"]}</Col>
        </Row>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            Silver:
          </Col>
          <Col xs={8}>{quotesData["Silver"]}</Col>
        </Row>
        <hr />
        <strong className="row mb-2">Selected Quote:</strong>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            {selectedQuote}&nbsp; -&nbsp;Amount: {quotesData[selectedQuote]}
          </Col>
        </Row>
        <hr />
        <strong className="row mb-2">AI Recommendation</strong>
        <Row className="mb-2">
          <Col xs={4} className="fw-bold">
            {recommendedPackage}
          </Col>
        </Row>
      </>
    );
  };

  const subscribeLifePolicy = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/InsuranceHub/customer/lifepolicy/${user.username}`,
        {
          employement: formData.employement,
          height: formData.height,
          weight: formData.weight,
          bloodGroup: formData.bloodGroup,
          dependent: formData.dependent,
          annualIncome: formData.annualIncome,
          healthHistory: formData.healthHistory,
          smoking: formData.smoking,
          date: new Date(),
          paymentMethod: values.cardNumber,
          username: user.username,
          paymentAmount: quotesData[selectedQuote].substring(1),
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        messageApi.open({
          type: "success",
          content: "Life Policy created",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
        navigate(`/profile/${user.username}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Error fetching data. Please try again later.");
    }
  };

  const subscribeHomePolicy = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/InsuranceHub/customer/homepolicy/${user.username}`,
        {
          propertyType: formData.propertyType,
          estimatedPropertyValue: formData.propertyValue,
          leaseAgreementDetails: formData.leaseDetails,
          hasPets: formData.hasPets,
          petDetails: formData.petsDetails,
          numberOfOccupants: formData.numOccupants,
          propertyLocation: formData.propertyLocation,
          numberOfBedrooms: formData.numBedrooms,
          numberOfBathrooms: formData.numBathrooms,
          squareFootage: formData.propertySquareFeet,
          date: new Date(),
          paymentMethod: values.cardNumber,
          username: user.username,
          paymentAmount: quotesData[selectedQuote].substring(1),
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        messageApi.open({
          type: "success",
          content: "Home Policy created",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
        navigate(`/profile/${user.username}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Error fetching data. Please try again later.");
    }
  };

  const subscribeAutoPolicy = async (values) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/InsuranceHub/customer/automobilepolicy/${user.username}`,
        {
          automobileMake: formData.automobileMake,
          automobileModel: formData.automobileModel,
          automobileYear: formData.automobileYear,
          vin: formData.vin,
          drivingLicenseNumber: formData.drivingLicenseNumber,
          automobileUsage: formData.automobileUsage,
          mileage: formData.mileage,
          licensePlateNumber: formData.licensePlateNumber,
          safetyFeatures: formData.safetyFeatures,
          date: new Date(),
          paymentMethod: values.cardNumber,
          username: user.username,
          paymentAmount: quotesData[selectedQuote].substring(1),
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        messageApi.open({
          type: "success",
          content: "Automobile Policy created",
          className: "custom-class",
          style: {
            marginTop: "20vh",
          },
        });
        navigate(`/profile/${user.username}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Error fetching data. Please try again later.");
    }
  };

  const onCheckoutSubmit = (values) => {
    if (selectedFormType === "life") {
      subscribeLifePolicy(values);
    } else if (selectedFormType === "home") {
      subscribeHomePolicy(values);
    } else if (selectedFormType === "auto") {
      subscribeAutoPolicy(values);
    }
  };

  return (
    <div className="container">
      <div className="checkout-data">
        <div className="row">
          <Card title="Checkout Summary">
            <div>{renderData()}</div>
          </Card>
        </div>
      </div>

      <div className="payment-form row mt-4">
        <h2>Payment Details</h2>
        <Form name="paymentForm" onFinish={onCheckoutSubmit}>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please enter your card number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;

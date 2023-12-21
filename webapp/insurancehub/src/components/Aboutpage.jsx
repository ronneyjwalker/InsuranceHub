
import { Row, Col, Typography, Divider, Image } from 'antd';
const { Title, Paragraph,Text } = Typography;

const Aboutpage = () => {
  return (
    <div className="container" style={{ height: "80vh" }}>
    <Row justify="center" align="middle" className="impact">
      <Col xs={24} md={10} className="grid-items__2" style={{ textAlign: 'center' }}>
        <Image src="https://cdn.shopify.com/s/files/1/1904/9691/t/14/assets/iyaimpact-1647685349138.png" alt="" style={{ maxWidth: '100%', verticalAlign: 'middle' }} />
      </Col>
      <Col xs={24} md={12} className="grid-items__2" style={{ textAlign: 'center' }}>
        <Title level={1} style={{ marginBottom: '16px' }}>INSURANCEHUB</Title>
        <Paragraph>We believe in helping and in securing our clients future:</Paragraph>
        <Divider />

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Text strong style={{ fontSize: '16px' }}>Life Insurance Policy</Text></li>
        </ul>
        <Paragraph>Life coverage for our customers</Paragraph>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Text strong style={{ fontSize: '16px' }}>Home Insurance Policy</Text></li>
        </ul>
        <Paragraph>Home coverage for our customers</Paragraph>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Text strong style={{ fontSize: '16px' }}>Automobile Insurance Policy</Text></li>
        </ul>
        <Paragraph>Automobile coverage for our customers</Paragraph>

      </Col>
    </Row>
    </div>
  );
};

export default Aboutpage;



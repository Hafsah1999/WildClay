import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const OrderHistory = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:5000/order/getbyuser', {
      headers: {
        'x-auth-token': (JSON.parse(sessionStorage.getItem('user')))
      }
    });
    const data = await response.json();
    console.log(data);
    setPaymentData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <Container>
      <h1 className="text-center my-5 font-serif text-2xl text-orange-900">Order History</h1>

      <div className="m-5 p-8 bg-orange-100 shadow-lg">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          paymentData.map((order, index) => (
            <Row key={order._id} className="mb-4">
              <Col sm={6}>
                <p className="text-orange-800 text-xl font-serif">Shipping Address</p>
                <p>{order.shipping.name}</p>
                <p>{order.shipping.address.line1}</p>
                <p>{order.shipping.address.postal_code}</p>
              </Col>
              <hr className='my-3 border-orange-200' />
              <Col sm={6}>
                <p className="text-orange-800 text-xl font-serif">Order Details</p>
                <p>Order ID: {order._id}</p>
                <p>Amount: ₹{order.details.amount/100}</p>
                <p>Payment Status: {order.paymentStatus}</p>
              </Col>
            </Row>
          ))
        )}
      </div>
    </Container>
  );
};

export default OrderHistory;
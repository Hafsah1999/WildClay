import React, { useEffect, useRef, useState } from 'react';
import { Container, Button, Card, Form, FormGroup, FormLabel } from 'react-bootstrap';
import * as Yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';
import PaymentGateway from './PaymentGateway';
import { Elements } from '@stripe/react-stripe-js';
import useCartContext from '../../Context/CartContext';
import useAppContext from '../../Context/AppContext';

const appearance = {
    theme: "day",
};

const CheckoutSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
});

function Checkout() {
    const [clientSecret, setClientSecret] = useState('');
    const { getCartItemsCount, getCartTotal, cartItems } = useCartContext();
    const { currentUser } = useAppContext();
    const addressRef = useRef();
    const pincodeRef = useRef();
    const contactRef = useRef();

    const stripePromise = loadStripe('pk_test_51OfemmSAfzZtNsjPArIjjac6Mgz9TpxlhHcrFIBOG7tE4NZrWXEN9rxbQFzUZ3cJQ7mQORbyVCfCpMtqhRwIWOVL00mZBYhk3d');
    const getPaymentIntent = async () => {
        const shipping = {
            name: currentUser.name,
            address: {
                line1: addressRef.current.value,
                postal_code: pincodeRef.current.value,
                country: 'IN',
            },
        };
        sessionStorage.setItem('shipping', JSON.stringify(shipping));
        // console.log(getCartTotal());
        const res = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: getCartTotal(),
                customerData: shipping
            })
        });
        const data = await res.json();
        console.log(data);
        setClientSecret(data.clientSecret);
    };

    return (
        <Container>
            <Card>
                <Card.Body>
                    <hr />
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <div className="font-sans bg-orange-100">
                                <div className="flex max-sm:flex-col gap-4 h-full">
                                    <div className="bg-gradient-to-r from-orange-800 via-orange-700 to-orange-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[350px] sm:min-w-[300px]">
                                        <div className="relative h-full">
                                            <div className="p-4 sm:overflow-auto sm:h-[calc(100vh-60px)]">
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-24 h-20 max-lg:w-24 max-lg:h-24 flex p-2 shrink-0 bg-orange-300 rounded-md">
                                                            <img
                                                                src={'http://localhost:5000/' + item.image}
                                                                className="w-full object-contain"
                                                            />
                                                        </div>
                                                        <div className="w-full">
                                                            <h3 className="text-base text-white">{item.pname}</h3>
                                                            <ul className="text-xs text-orange-300 space-y-1 mt-2">
                                                                <li className="flex flex-wrap gap-4">
                                                                    Category <span className="ml-auto">{item.pcategory}</span>

                                                                </li>

                                                                <li className="flex flex-wrap gap-4">
                                                                    Price <span className="ml-auto">{item.pprice}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="md:absolute md:left-0 md:bottom-0 bg-orange-800 w-full p-4">
                                                <h4 className="flex flex-wrap gap-4 text-base text-white">

                                                    Items <span className="ml-auto">{getCartItemsCount()}</span>
                                                    Total Price <span className="ml-auto">{getCartTotal()}</span>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-w-4xl mx-auto w-full h-max rounded-md p-4 sticky top-0">
                                        <Card.Body>
                                            <Card.Title className='text-lg text-orange-900 font-semibold'>Delivery Address</Card.Title>
                                            <hr />
                                            <Form>
                                                <FormGroup className='mt-8'>
                                                    <FormLabel className='text-md font-serif' >Pin Code</FormLabel><br />
                                                    <Form.Control ref={pincodeRef} type="number" maxLength={6} minLength={6} />
                                                </FormGroup>
                                                <FormGroup className='my-4'>
                                                    <FormLabel className='font-serif'>Contact</FormLabel> <br />
                                                    <Form.Control ref={contactRef} type="text" maxLength={10} />
                                                </FormGroup>
                                                <FormGroup className='mb-5'>
                                                    <FormLabel className='font-serif'>Shipping Address</FormLabel> <br />
                                                    <Form.Control ref={addressRef} style={{ border: "1px solid black" }} as="textarea" className='w-full' rows={4} />
                                                </FormGroup>
                                                <Button className='bg-orange-900 text-white py-1 px-8 rounded-lg font-serif block mx-auto' variant="primary" onClick={getPaymentIntent}>Pay Now</Button>
                                            </Form>
                                        </Card.Body>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </Card.Body>




                {clientSecret && (
                    <Elements stripe={stripePromise} options={{
                        clientSecret,
                        appearance
                    }}>
                        <PaymentGateway />
                    </Elements>
                )}
            </Card>

        </Container>
    );
}

export default Checkout;

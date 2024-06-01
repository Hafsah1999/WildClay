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

        <div className="relative mx-auto w-full bg-white">
            <div className="grid min-h-screen grid-cols-10">
                <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                    <div className="mx-auto w-full max-w-lg">
                        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                            Secure Checkout
                            <span className="mt-2 block h-1 w-10 bg-orange-800 sm:w-20" />
                        </h1>
                    
                    <p className='text-lg my-4 font-semibold text-orange-900'>Delivery Address</p>
                    <hr />
                    <form className='mt-4'>
                    
                            <p>Pin Code</p>
                            <input ref={pincodeRef} type="number" className='w-full my-3' maxLength={6} minLength={6} />
                       
                            <p>Contact</p>
                            <input ref={contactRef} className='w-full my-3' type="text" maxLength={10} />
                        
                      
                            <p>Shipping Address</p>
                            <textarea ref={addressRef} className='w-full my-3' style={{border:"1px solid gray"}} as="textarea" rows={3} />
                    
                        <Button  type="submit"
                            className="mt-4 inline-flex w-full items-center justify-center rounded bg-orange-800 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-orange-500 sm:text-lg" variant="primary" onClick={getPaymentIntent}>Proceed to Pay</Button>
                    </form>
             

                {clientSecret && (
                <Elements stripe={stripePromise} options={{
                    clientSecret,
                    appearance
                }}>
                    <PaymentGateway />
                </Elements>
            )}
                        {/* <form action="" className="mt-10 flex flex-col space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-xs font-semibold text-gray-500"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john.capler@fang.com"
                                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="relative">
                                <label
                                    htmlFor="card-number"
                                    className="text-xs font-semibold text-gray-500"
                                >
                                    Card number
                                </label>
                                <input
                                    type="text"
                                    id="card-number"
                                    name="card-number"
                                    placeholder="1234-5678-XXXX-XXXX"
                                    className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-500"
                                />
                                <img
                                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                                    alt=""
                                    className="absolute bottom-3 right-3 max-h-4"
                                />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">
                                    Expiration date
                                </p>
                                <div className="mr-6 flex flex-wrap">
                                    <div className="my-1">
                                        <label htmlFor="month" className="sr-only">
                                            Select expiration month
                                        </label>
                                        <select
                                            name="month"
                                            id="month"
                                            className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Month</option>
                                        </select>
                                    </div>
                                    <div className="my-1 ml-3 mr-6">
                                        <label htmlFor="year" className="sr-only">
                                            Select expiration year
                                        </label>
                                        <select
                                            name="year"
                                            id="year"
                                            className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Year</option>
                                        </select>
                                    </div>
                                    <div className="relative my-1">
                                        <label htmlFor="security-code" className="sr-only">
                                            Security code
                                        </label>
                                        <input
                                            type="text"
                                            id="security-code"
                                            name="security-code"
                                            placeholder="Security code"
                                            className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="card-name" className="sr-only">
                                    Card name
                                </label>
                                <input
                                    type="text"
                                    id="card-name"
                                    name="card-name"
                                    placeholder="Name on the card"
                                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </form> */}
                    </div>
                </div>
                <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                    <h2 className="sr-only">Order summary</h2>
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-orange-600 to-orange-900 opacity-95" />
                    </div>
                    {cartItems.map(item => (
                        <div key={item.id}>
                            <div className="relative ">
                                <ul className="space-y-5">
                                    <li className="flex justify-between">
                                        <div className="inline-flex">
                                            <img src={'http://localhost:5000/' + item.image} alt="" className="w-auto mx-auto  h-24  py-1 " style={{ objectFit: "cover" }} />

                                            <div className="ml-3">
                                                <p className="text-base font-semibold text-white">
                                                    {item.pname}
                                                </p>
                                                <p className="text-sm font-medium text-white text-opacity-80">
                                                    {item.pcategory}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-semibold text-white">₹{item.pprice}</p>
                                    </li>

                                </ul>
                                <div className="my-5 h-0.5 w-full bg-white bg-opacity-30" />
                                <div className="space-y-2">
                                    <p className="flex justify-between text-lg font-bold text-white">
                                        <span>Total price:</span>
                                        <span>{getCartTotal()}</span>
                                    </p>
                                    <p className="flex justify-between text-sm font-medium text-white">
                                        <span>Total items:</span>
                                        <span>{getCartItemsCount()}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="relative mt-10 text-white">
                        <h3 className="mb-5 text-lg font-bold">Support</h3>
                        <p className="text-sm font-semibold">
                            +01 653 235 211 <span className="font-light">(International)</span>
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            support@nanohair.com <span className="font-light">(Email)</span>
                        </p>
                        <p className="mt-2 text-xs font-medium">
                            Call us now for payment related issues
                        </p>
                    </div>
                    <div className="relative mt-10 flex">
                        <p className="flex flex-col">
                            <span className="text-sm font-bold text-white">
                                Money Back Guarantee
                            </span>
                            <span className="text-xs font-medium text-white">
                                within 30 days of purchase
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        // <Container>
        //     <Card>
        //         <Card.Body>
        //             <Card.Title>Product Details</Card.Title>
        //             <hr />
        //             {cartItems.map(item => (
        //                 <div key={item.id}>
        //                     {/* <img src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image[0]}`} alt={item.name} width={50} /> */}
        //                     <div>
        //                         <p>{item.pname}</p>
        //                         <p>Items : {getCartItemsCount()}</p>
        //                     </div>
        //                     <div>
        //                         <p>Total : ₹{getCartTotal()}</p>
        //                     </div>
        //                 </div>
        //             ))}
        //         </Card.Body>
        //     </Card>
        //     <Card>
               
        //     </Card>

           
        // </Container>
    );
}

export default Checkout;

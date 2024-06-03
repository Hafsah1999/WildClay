import React, { useState } from 'react';
import { ElementsConsumer, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAppContext from '../../Context/AppContext';


const PaymentGateway = () => {

    const { currentUser, setCurrentUser } = useAppContext();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            console.log('stripe not loaded');
            return;
        }
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/User/thankyou",
                receipt_email: currentUser.email,
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <>



        <div className="container mt-3">
        <div className='"max-w-sm rounded overflow-hidden mt-2 shadow-lg"'  withBorder p={30} mt={30}>
            
            <form onSubmit={handleSubmit}>
                <h1 order={3} my={30} mx="auto" className='mb-8 text-orange-900 font-semibold text-center mt-8  text-2xl'>Secure Payment Gateway</h1>
                <PaymentElement className='mx-12 px-24 py-4 bg-orange-100 shadow ' />
                <button disabled={!stripe}  className="bg-orange-900 px-12 py-1 rounded text-white font-serif mx-auto block my-5" type="submit" variant='filled' mt={20}>Submit</button>
            </form>
        </div>
        </div>
        </>
    )
}

export default PaymentGateway
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
                return_url: "http://localhost:5173/thankyou",
                receipt_email: currentUser.email,
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
           
        }
    };

    return (
        <div className="container mt-3">
        <div className='"max-w-sm rounded overflow-hidden mt-2 shadow-lg"'  withBorder p={30} mt={30}>
            
            <form onSubmit={handleSubmit}>
                <h1 order={3} my={30} mx="auto" className='mb-2'>Secure Payment Gateway</h1>
                <PaymentElement />
                <button disabled={!stripe}
                            className="mt-4 inline-flex w-full items-center justify-center rounded bg-orange-800 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-orange-500 sm:text-lg" type="submit" variant='filled' mt={20}>Pay Now</button>
            </form>
        </div>
        </div>
    )
}

export default PaymentGateway
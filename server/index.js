//express initialization
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const FeedbackRouter = require('./Routers/FeedbackRouter');
const contactRouter = require('./Routers/contactRouter');
const userRouter = require('./Routers/userRouter');
const productRouter = require('./Routers/productRouter');
const utilRouter = require('./Routers/Utils');
const orderRouter = require('./Routers/orderRouter');
const stripe = require('stripe')('sk_test_51OfemmSAfzZtNsjP4i4NDmJLu0PdgEFyMhNsU0FK8o9PhUqw9byqqkw8PMjxYktyqeyAYEnmqbB4SX0YA3VGusA800cm1C368f');

app.use(express.static('./uploads'));
app.use(express.json({limit : "10mb"}));

app.use(cors ({
    origin: ['http://localhost:5173']
}))

app.use('/Feedback', FeedbackRouter)
app.use('/contact', contactRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/util', utilRouter)
app.use('/order', orderRouter)

app.use(express.static('./uploads'));

app.get('/get-permission', (req, res) => {
    const token = req.header('x-auth-token');
    console.log(token);
    if(token === 'admin'){
        res.json({allowed: true});
    }else{
        res.json({allowed: false});
    }
})

app.post('/create-payment-intent', async (req, res) => {
    const { amount, customerData } = req.body;
    // const { name, address } = customerData;
    console.log(amount);
    const customer = await stripe.customers.create(customerData);
    console.log(customer.id);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'inr',
      description: 'Payment Description',
      customer : customer.id
    });
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  });
  
  app.post('/retrieve-payment-intent', async (req, res) => {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.json(paymentIntent);
  });


app.listen(port, () => {
    console.log('Server running on port : 5000');
})
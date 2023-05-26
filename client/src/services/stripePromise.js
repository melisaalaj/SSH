import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51N8NsNJfPtLrc5k00vcYa3vSsCQSGtXz0CDPqnFhusQZnio6fVWHhhq6Oi1FjGO2XvSjsesFphe8stsb8fQqoSYk00GmypY5Hv');

export default stripePromise;
import React, { useContext, useState, useEffect } from 'react';
import { SelectedItemsContext } from '../services/SelectedItemsContext';
import '../assets/styles/shopcard.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAsyncValue, useParams } from 'react-router-dom';

export default function ShopCard() {
  const { selectedItems, setSelectedItems } = useContext(SelectedItemsContext);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [orderedItems, setOrderedItems] = useState([]);
 
  const removeSelectedItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const calculateTotalPrice = () => {
    let total = 0;
    for (let item of selectedItems) { 
      total += parseFloat(item.price);
    }
    return total.toFixed(2);
  };

 
  
  const handleOrder = async () => {
    try {
    
      const orderData = {
        arrivalTime: formattedDate,
        price: selectedItems.map((item) => item.price),
        orderConfirmation:null,
       
      };
const id = selectedItems.map((item) => item.restaurantId);
const response = await axios.post(`http://localhost:3000/api/order/${id}`, orderData);
      
      if (response.data.success) {
      
        setOrderedItems(response.data.orderedItems);
        setSuccessMessage('Order saved successfully!');
        alert('Porosia u ruajt me sukses!');
      } else {
  
        console.error('Error saving order:', response.data.error);
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert("Nuk mund te ruani porosine!")
    }
  };

  const handlePaymentSubmit = async (event) => {
  event.preventDefault();

  try {
    if (!stripe || !elements) {
      setPaymentError('Stripe.js has not loaded yet. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      return;
    }

    const { cardNumber, cvc, exp_month, exp_year, zip } = paymentMethod.card;

    const response = await axios.post('http://localhost:3000/api/stripe/charge', {
      cardNumber: cardNumber,
      cvc: cvc,
      exp_month: exp_month,
      exp_year: exp_year,
      zip: zip,
    });

    if (response.data.success) {
     
      setPaymentSuccess(true);
      setSelectedItems([]);
      setSuccessMessage('Payment done!');
      localStorage.setItem('payment', JSON.stringify(response.data.payment));
      localStorage.setItem('accessToken', response.data.access_token);
    } else {
      setPaymentError(response.data.error);
    }
  } catch (error) {
    console.error(error);
    setPaymentError('Payment failed');
  }
};

  return (
    <div className="div">
      <div className="div1">
        <p className="porosia">Porosia juaj</p>
        {selectedItems.length > 0 ? (
          <div className="artikujt">
            <p className="artukujtezgjedhur">Artikujt e zgjedhur:</p>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} Euro - {formattedDate}
                  <button className="butoni1" onClick={() => removeSelectedItem(index)}>
                    Largo
                  </button>
                </li>
              ))}
            </ul>
            <p className="cmimi">Totali: {calculateTotalPrice()} EUR</p>
<button type="submit"></button>
            <form onSubmit={handlePaymentSubmit} id="forms">
            <CardElement
  options={{
    style: { base: { fontSize: '16px' } },
    cardNumber:'cardNumber',
    expMonth: 'exp_month',
    expYear: 'exp_year',
    cvc: 'cvc',
    postalCode: 'zip',
  }}
/>
              {paymentError && <div className="error-message">{paymentError}</div>}
              {paymentSuccess && <div className="success-message">Pagesa u krye me sukses!</div>}
              <button className="vazhdobtn" type="submit">
                Paguaj
              </button>
            </form>
            <button className="vazhdobtn" onClick={handleOrder}>
              Ruaj Porosine
            </button>
          </div>
        ) : (
          <div className="center">Nuk keni shtuar asgjë akoma</div>
        )}
      </div>
    </div>
  );
}

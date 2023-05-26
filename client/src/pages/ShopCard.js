import React, { useContext, useState } from 'react';
import { SelectedItemsContext } from '../services/SelectedItemsContext';
import "../assets/styles/shopcard.css";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function ShopCard() {
  const { selectedItems, setSelectedItems } = useContext(SelectedItemsContext);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  const removeSelectedItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  
  const calculateTotalPrice = () => {
    let total = 0;
    for (let item of selectedItems) {
      total += parseFloat(item.price);
    }
    return total.toFixed(2); 
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    
    const cardElement = elements.getElement(CardElement);
    
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      const response = await axios.post('/', {
        amount: calculateTotalPrice() * 100, 
        paymentMethodId: paymentMethod.id,
      });
  
      if (response.data.success) {
        setPaymentSuccess(true);
        setSelectedItems([]);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  return (
    <div className="div">
      <div className="div1">
        <p className="porosia">Porosia juaj</p>
        {selectedItems.length > 0 ? (
          <div className='artikujt'>
            <p className="artukujtezgjedhur">Artikujt e zgjedhur:</p>
            <ul>
              {selectedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} Euro
                  <button className='butoni1' onClick={() => removeSelectedItem(index)}>Largo</button>
                </li>
              ))}
            </ul>
            <p className="cmimi">Totali: {calculateTotalPrice()} EUR</p>
            
            
            <form onSubmit={handlePaymentSubmit}>
              <CardElement />
              {paymentError && <div className="error-message">{paymentError}</div>}
              {paymentSuccess && <div className="success-message">Pagesa u krye me sukses!</div>}
              <button className='vazhdobtn' type="submit">Paguaj</button>
            </form>
          </div>
        ) : (
          <div className="center">Nuk keni shtuar asgjë akoma</div>
        )}
      </div>
    </div>
  );
}

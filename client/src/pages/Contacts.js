import React, { useEffect, useState } from 'react';
import '../assets/styles/contacts.css';

const Contacts = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contact');
        if (response.ok) {
          const data = await response.json();
          setContactMessages(data);
        } else {
          throw new Error('Error fetching contact messages');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactMessages();
  }, []);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <h1 className="page-title">Contact Messages</h1>
      {contactMessages.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <ul className="message-list">
          {contactMessages.map((message) => (
            <li key={message.id} className="message-item">
              <h3 className="message-name">Name: {message.name}</h3>
              <p className="message-info">Email: {message.email}</p>
              <p className="message-info">Phone Number: {message.phoneNumber}</p>
              <p className="message-text">Message: {message.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Contacts;
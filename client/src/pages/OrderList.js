import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Extract orders from the first element of the response data array
        const ordersData = data[0];
        setOrders(ordersData);
      } else {
        // Handle error case
        console.log("Failed to fetch orders");
      }
    } catch (error) {
      // Handle error case
      console.log("Failed to fetch orders:", error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Restaurant</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Confirmation</TableCell>
            <TableCell>Arrival Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user ? order.user.username : "N/A"}</TableCell>
              <TableCell>{order.restaurant ? order.restaurant.name : "N/A"}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.orderConfimation ? "Confirmed" : "Pending"}</TableCell>
              <TableCell>{order.arrivalTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;

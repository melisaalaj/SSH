import React, { useEffect, useState } from 'react';
import "../assets/styles/staff.css";

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const fetchStaffMembers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStaffMembers(data.data); // Use data.data to access the array of staff members
        } else {
          throw new Error('Error fetching staff members');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStaffMembers();
  }, []);

  if (staffMembers.length === 0) {
    return <div>No staff members found.</div>;
  }

  return (
    <div className='staff-container'>
      <h2>Staff</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staffMember) => (
            <tr key={staffMember.id}>
              <td>{staffMember.firstName} {staffMember.lastName}</td>
              <td>{staffMember.email}</td>
              <td>{staffMember.role}</td>
              <td>{staffMember.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;
import React, { useEffect, useState } from 'react';

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    // Fetch staff members and set the data in the state
    const fetchStaffMembers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user');
        if (response.ok) {
          const data = await response.json();
          setStaffMembers(data);
        } else {
          throw new Error('Error fetching staff members');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStaffMembers();
  }, []);

  return (
    <div>
      <h2>Staff</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Privileges</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staffMember) => (
            <tr key={staffMember.id}>
              <td>{staffMember.name}</td>
              <td>{staffMember.email}</td>
              <td>{staffMember.privileges}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Staff;

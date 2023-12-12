import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";
import UserDetails from './UserDetails';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };


  const handleDelete = async (userId) => {
    try {
      console.log('Deleting user with ID:', userId);
      await axios.delete(`/api/users/${userId}`);
      console.log('User deleted successfully');
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };
  
  const handleSave = async (userId, updatedUserData) => {
    try {
      await axios.put(`/api/users/${userId}`, updatedUserData);
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setSelectedUser(null);
    } catch (error) {
      console.error('Save Error:', error);
    }
  };
  
  
  

  return (
    <div>
      <h1>User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address1</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip Code</th>
            <th>
              Update
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.address2Country}</td>
              <td>{user.stateName}</td>
              <td>{user.countryName}</td>
              <td>{user.zipCode}</td>
              <td>
              <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UserList;

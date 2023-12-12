import React, { useState } from 'react';
import Modal from 'react-modal';

function UserDetails({ user, onSave, onCancel }) {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    // console.log('Saving changes:', editedUser);
    const { _id, ...userWithoutId } = editedUser;
    // console.log('Sending to onSave:', userWithoutId);
    onSave(_id, userWithoutId);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleCancel}
      contentLabel="Edit User Details"
    >
      <h2>Edit User Details</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={editedUser.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={editedUser.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="phoneNumber"
          value={editedUser.phoneNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Address 1:
        <input
          type="text"
          name="address2Country"
          value={editedUser.address2Country}
          onChange={handleChange}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          name="stateName"
          value={editedUser.stateName}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="countryName"
          value={editedUser.countryName}
          onChange={handleChange}
        />
      </label>
      <label>
        Zip Code:
        <input
          type="text"
          name="zipCode"
          value={editedUser.zipCode}
          onChange={handleChange}
        />
      </label>
      <div className="modal-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </Modal>
  );
}

export default UserDetails;

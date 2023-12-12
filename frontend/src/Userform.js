import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countrydata from "./Countrydata.json";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Userform.css";

function Userform() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setvalid] = useState(true);
  const [countryId, setCountryId] = useState("");
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeValid, setZipCodeValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlephone = (value) => {
    setPhoneNumber(value);
    setvalid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{12}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  // country
  const handelcountry = (e) => {
    const getcountryId = e.target.value;
    const selectedCountry = countrydata.find(
      (country) => country.country_id === getcountryId
    );
    setState(selectedCountry.states);
    setCountryId(getcountryId);
  };

  // states
const handlestate = (e) => {
  const stateId = e.target.value;
  setStateId(stateId);
};


  // Zip Code
  const handleZipCode = (e) => {
    const zipCode = e.target.value;
    setZipCode(zipCode);
    const zipCodePattern = /^\d{6}$/;
    const isValidZipCode = zipCodePattern.test(zipCode);
    setZipCodeValid(isValidZipCode);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      phoneNumber,
      countryName: countrydata.find((c) => c.country_id === countryId)?.country_name,
      stateName: state.find((s) => s.state_id === stateId)?.state_name,
      zipCode,
      address2Country: e.target.address2Country.value,
      address2State: e.target.address2State.value,
      address2ZipCode: e.target.address2ZipCode.value,
    };
    try {
      const response = await axios.post(
        "/api/users",
        userData
      );
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setPhoneNumber("");
      setvalid(true);
      setCountryId("");
      setState([]);
      setStateId("");
      setZipCode("");
      e.target.firstname.value = "";
      e.target.lastname.value = "";
      e.target.email.value = "";
      e.target.address2Country.value = "";
      e.target.address2State.value = "";
      e.target.address2ZipCode.value = "";
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while saving the data.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>User Details Form</h1>
        <div className="input_field">
          <label>First Name</label>
          <input
            type="text"
            className="firstname"
            name="firstname"
            placeholder="Enter First Name"
            required
          />
        </div>
        <div className="input_field">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastname"
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div className="input_field">
          <label>Email*</label>
          <input
            type="email"
            className="email"
            name="email"
            placeholder="Enter Your Email Id"
            required
          />
        </div>
        <div className="phone">
          <label>Phone*</label>
          <PhoneInput
          className="phone_number"
            country={"us"}
            inputProps={{ require: true }}
            type="text"
            value={phoneNumber}
            onChange={handlephone}
            placeholder="Enter your Phone Number"
           
          />
          {!valid && <p>Please enter a valid 10-digit phone Number</p>}
        </div>
        <div className="address">
          <label>Address 1*</label>
          <select name="country" onChange={(e) => handelcountry(e)}>
            <option>-- Select Country --</option>
            {countrydata.map((getcountry, index) => (
              <option value={getcountry.country_id} key={index}>
                {getcountry.country_name}
              </option>
            ))}
          </select>
          <select name="states" onChange={(e) => handlestate(e)}>
            <option value="">--Select State--</option>
            {state.map((getstate, index) => (
              <option value={getstate.state_id} key={index}>
                {getstate.state_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="address2ZipCode"
            placeholder="Zip Code"
            required
            onChange={(e) => handleZipCode(e)}
          />
          {!zipCodeValid && <p>Zip Code must be a valid 6-digit number.</p>}
        </div>
        <div className="address">
          <label>Address 2</label>
          <input type="text" name="address2Country" placeholder="Country" />
          <input type="text" name="address2State" placeholder="State" />
          <input type="number" name="address2ZipCode" placeholder="Zip Code" />
        </div>
        <button type="submit" >Submit</button>
        <Link to="/userlist">
          <button>Show User List</button>
        </Link>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Userform;

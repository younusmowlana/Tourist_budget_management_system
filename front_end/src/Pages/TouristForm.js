import React, { useState } from "react";
import ReactSelect from "react-select"; // For the destination dropdown
import "./TouristForm.css"; // Create your own CSS for responsive design

const TouristForm = () => {
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState(null); // For ReactSelect
  const [visitorCount, setVisitorCount] = useState('');
  const [timeStay, setTimeStay] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const currency = "$"; // Default currency set to dollars

  // Options for the destination dropdown
  const areaOptions = [
    { value: 'Colombo', label: 'Colombo' },
    { value: 'Kandy', label: 'Kandy' },
    { value: 'Galle', label: 'Galle' },
    // Add more areas
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      budget,
      area,
      visitorCount,
      timeStay,
      otherInfo,
      currency,
    });
  };

  return (
    <div className="form-container">
      <h2>Let's start your trip</h2>

      <form onSubmit={handleSubmit}>
        {/* Budget Input */}
        <div className="input-container">
          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your budget"
          />
          <span className="currency">{currency}</span>
        </div>

        {/* Area Selection */}
        <div className="input-container">
          <label htmlFor="area">Desired Area</label>
          <ReactSelect
            id="area"
            value={area}
            onChange={setArea}
            options={areaOptions}
            placeholder="Select an area"
          />
        </div>

        {/* Visitor Count */}
        <div className="input-container">
          <label htmlFor="visitorCount">Visitor Count</label>
          <input
            type="number"
            id="visitorCount"
            value={visitorCount}
            onChange={(e) => setVisitorCount(e.target.value)}
            placeholder="Enter visitor count"
          />
        </div>

        {/* Time Stay */}
        <div className="input-container">
          <label htmlFor="timeStay">Time Stay</label>
          <input
            type="text"
            id="timeStay"
            value={timeStay}
            onChange={(e) => setTimeStay(e.target.value)}
            placeholder="Enter time of stay"
          />
        </div>

        {/* Other Information */}
        <div className="input-container">
          <label htmlFor="other">Other Information</label>
          <textarea
            id="other"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            placeholder="Any additional information"
            maxLength={200}
          />
          <small>{otherInfo.length}/200</small>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Let's Go
        </button>
      </form>
    </div>
  );
};

export default TouristForm;

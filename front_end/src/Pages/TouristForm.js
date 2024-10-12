import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";
import fetchDestinationList from "../service/destinationService";
import "./Tourist.css";

const TouristForm = () => {
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState(null);
  const [areaOptions, setAreaOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visitorCount, setVisitorCount] = useState("");
  const [timeStay, setTimeStay] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const currency = "$";

  useEffect(() => {
    const loadDestinations = async () => {
      const destinations = await fetchDestinationList(searchTerm, 5, 0);
      
      const formattedOptions = destinations?.data?.map((destination) => ({
        value: destination._id,
        label: destination.name,
      }));
      setAreaOptions(formattedOptions);
    };

    loadDestinations();
  }, [searchTerm]);

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
        <div className="input-container">
          <label htmlFor="budget">Budget:</label>
          <div className="budget-input">
            <span className="currency">$</span>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setBudget(value);
                }
              }}
              placeholder="Enter your budget"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="area">Desired Area:</label>
          <ReactSelect
            id="area"
            value={area}
            onChange={setArea}
            options={areaOptions}
            onInputChange={setSearchTerm}
            placeholder="Select an Destination"
            isLoading={areaOptions?.length === 0}
          />
        </div>

        <div className="input-container">
          <label htmlFor="visitorCount">Visitor Count:</label>
          <input
            type="number"
            id="visitorCount"
            value={visitorCount}
            onChange={(e) => setVisitorCount(e.target.value)}
            placeholder="Enter visitor count"
          />
        </div>

        <div className="input-container">
          <label htmlFor="timeStay">Time Stay:</label>
          <input
            type="text"
            id="timeStay"
            value={timeStay}
            onChange={(e) => setTimeStay(e.target.value)}
            placeholder="Enter time of stay"
          />
        </div>

        <div className="input-container">
          <label htmlFor="other">Other Information:</label>
          <textarea
            id="other"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            placeholder="Any additional information"
            maxLength={200}
          />
          <small>{otherInfo.length}/200</small>
        </div>

        <button type="submit" className="submit-button">
          Let's Go
        </button>
      </form>
    </div>
  );
};

export default TouristForm;

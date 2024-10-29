import React, { useState, useEffect, useRef } from "react";
import ReactSelect from "react-select";
import { TouristService } from "../service/touristService";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom"; 

const TouristForm = () => {
  const [budget, setBudget] = useState("");
  const [area, setArea] = useState(null);
  const [areaOptions, setAreaOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visitorCount, setVisitorCount] = useState("");
  const [timeStay, setTimeStay] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const loadDestinations = async () => {
      const destinations = await TouristService.fetchDestinationList(
        searchTerm,
        5,
        0
      );
      const formattedOptions = destinations?.data?.map((destination) => ({
        value: destination._id,
        label: destination.name,
      }));
      setAreaOptions(formattedOptions);
    };

    loadDestinations();
  }, [searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (simpleValidator.current.allValid()) {
      if (budget < 100 || budget > 1000) {
        Swal.fire({
          icon: "error",
          title: "Budget Error",
          text: "Budget must be between 100 and 1000.",
        });
        return;
      }
      setLoading(true);

      const tripData = {
        budget: Number(budget),
        destination: area?.label || "",
        number_of_days: Number(timeStay),
        visitor_count: Number(visitorCount),
      };

      try {
        const response = await TouristService.predictTrip(tripData);

        if (response) {
          if (response.status === 200) {
            navigate("/budget-plan", { state: { data: response, tripData:tripData } });
          } else {
            Swal.fire({
              icon: "warning",
              title: "warning",
              text:
                response?.error || "Something went wrong. Please try again.",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Bad Request",
          text: error.message || "An error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div className="form-container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
          <h2 className="trip-section">Let's start your trip</h2>
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
                <div className="danger">
                  {budget > 1000 && (
                    <span>Budget cannot be more than 1000.</span>
                  )}
                  {budget < 100 && budget !== "" && (
                    <span>Budget should be at least 100.</span>
                  )}
                  {simpleValidator.current.message(
                    "budget",
                    budget,
                    "required|numeric"
                  )}
                </div>
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
                placeholder="Select a Destination"
                isLoading={areaOptions?.length === 0}
              />
              <div className="danger">
                {simpleValidator.current.message("area", area, "required")}
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="visitorCount">Visitor Count:</label>
              <input
                type="number"
                id="visitorCount"
                value={visitorCount}
                onChange={(e) => setVisitorCount(e.target.value)}
                placeholder="Enter visitor count"
                min="1"
                max="5"
              />
              <div className="danger">
                {simpleValidator.current.message(
                  "visitorCount",
                  visitorCount,
                  "required|numeric|min:1,num|max:5,num"
                )}
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="timeStay">Time Stay:</label>
              <input
                type="number"
                id="timeStay"
                value={timeStay}
                onChange={(e) => setTimeStay(e.target.value)}
                placeholder="Enter time of stay"
                min="1"
                max="5"
              />
              <div className="danger">
                {simpleValidator.current.message(
                  "timeStay",
                  timeStay,
                  "required|numeric|min:1,num|max:5,num"
                )}
              </div>
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

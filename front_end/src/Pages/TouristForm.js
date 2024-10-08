import React, { useState } from "react";
import ReactSelect from "react-select";
import "./Tourist.css";
import TextField from '@mui/material/TextField';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

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

        {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Budget</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type= 'text' 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                 <AttachMoneyIcon/>
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <TextField
          id="outlined-select-currency-native"
          select
          label="Location"
          defaultValue=""
          slotProps={{
            select: {
              native: true,
            },
          }}
          helperText="Please select your desired travelling area"
        >         
        </TextField>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Visitor Count</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type= 'text' 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                 <PersonOutlineOutlinedIcon/>
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Time stay</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type= 'text' 
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                >
                 <PersonOutlineOutlinedIcon/>
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}

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

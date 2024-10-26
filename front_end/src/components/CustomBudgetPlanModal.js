import React, { useRef, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";

const CustomBudgetPlanModal = ({
  open,
  onClose,
  predictionResponse,
  customPlan,
  setCustomPlan,
  tripData,
  data
}) => {
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState(0);
  const navigate = useNavigate();

  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [selectedTransportation, setSelectedTransportation] = useState("");
  const [selectedFood, setSelectedFood] = useState("");

  const filterCustomPlan = (plan) => {
    const validKeys = [
      'accommodation_cost_per_person',
      'activities_cost_per_person',
      'food_cost_per_person',
      'others_cost_per_person',
      'transportation_cost_per_person',
    ];
  
    return Object.keys(plan)
      .filter((key) => validKeys.includes(key))
      .reduce((acc, key) => {
        acc[key] = plan[key];
        return acc;
      }, {});
  };
  

  const handleCustomPlanChange = (category, value) => {
    setCustomPlan((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const calculateTotalCustomCost = () => {
    const total = Object.values(customPlan).reduce((acc, value) => {
      const parsedValue = parseFloat(value);
      return acc + (isNaN(parsedValue) ? 0 : parsedValue);
    }, 0);
    return Math.round(total);
  };

  const accommodationOptions = Object.entries(predictionResponse).map(
    ([key, value]) => ({
      label: key,
      cost: value.accommodation_cost_per_person,
    })
  );

  const transportationOptions = Object.entries(predictionResponse).map(
    ([key, value]) => ({
      label: key,
      cost: value.transportation_cost_per_person,
    })
  );

  const foodOptions = Object.entries(predictionResponse).map(
    ([key, value]) => ({
      label: key,
      cost: value.food_cost_per_person,
    })
  );

  const activitiesOptions = Object.entries(predictionResponse).map(
    ([key, value]) => ({
      label: key,
      cost: value.activities_cost_per_person,
    })
  );

  const othersOptions = Object.entries(predictionResponse).map(
    ([key, value]) => ({
      label: key,
      cost: value.others_cost_per_person,
    })
  );

  const handleNextClick = (label) => {
    if (validator.current.allValid()) {
      const filteredCustomPlan = filterCustomPlan(customPlan);

      const accommodationPlan = data?.travelPlans.find(
        (plan) => plan.type === selectedAccommodation
      );
  
      const foodPlan = data?.travelPlans.find(
        (plan) => plan.type === selectedFood
      );
  
      const transportPlan = data?.travelPlans.find(
        (plan) => plan.type === selectedTransportation
      );
  
      const hotels = [
        {
          hotel_name: accommodationPlan?.hotels[0]?.hotel_name || "",
          hotel_img: accommodationPlan?.hotels[0]?.hotel_img || [],
          transport_by: transportPlan?.hotels[0]?.transport_by || "",
          near_by_attractions: accommodationPlan?.hotels[0]?.near_by_attractions || [],
          img: foodPlan?.hotels[0]?.img || [],
          food_places: foodPlan?.hotels[0]?.food_places || [],
        },
      ];
  
      const combinedPlans = [
        {
          label,
          ...tripData,
          ...filteredCustomPlan,
          hotels,
        },
      ];
  
      navigate("/plan-detail", { state: { data: combinedPlans } });
  
    } else {
      validator.current.showMessages();
      forceUpdate();
    }
  };
  
  
  
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: "20px",
          border: "none",
          overflow: "hidden",
          outline: "none",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          Customize Your Budget Plan
        </Typography>

        {/* Accommodation Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Accommodation</InputLabel>
          <Select
            value={customPlan.accommodation_cost_per_person || ""}
            onChange={(e) => {
              const selectedKey = accommodationOptions.find(option => option.cost === e.target.value)?.label || "";
              setSelectedAccommodation(selectedKey);
              handleCustomPlanChange("accommodation_cost_per_person", e.target.value);
              validator.current.showMessageFor("accommodation_cost_per_person");
            }}
            label="Accommodation"
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d1d1d1",
                },
                "&:hover fieldset": {
                  borderColor: "#6B26BB",
                },
              },
            }}
          >
            {accommodationOptions.map((option) => (
              <MenuItem key={option.label} value={option.cost}>
                {option.label} - {option.cost} $
              </MenuItem>
            ))}
          </Select>
          <Typography color="error">
            {validator.current.message(
              "accommodation_cost_per_person",
              customPlan.accommodation_cost_per_person,
              "required"
            )}
          </Typography>
        </FormControl>

        {/* Transportation Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Transportation</InputLabel>
          <Select
            value={customPlan.transportation_cost_per_person || ""}
            onChange={(e) => {
              const selectedKey = transportationOptions.find(option => option.cost === e.target.value)?.label || "";
              setSelectedTransportation(selectedKey);
              handleCustomPlanChange("transportation_cost_per_person", e.target.value);
              validator.current.showMessageFor("transportation_cost_per_person");
            }}
            label="Transportation"
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d1d1d1",
                },
                "&:hover fieldset": {
                  borderColor: "#6B26BB",
                },
              },
            }}
          >
            {transportationOptions.map((option) => (
              <MenuItem key={option.label} value={option.cost}>
                {option.label} - {option.cost} $
              </MenuItem>
            ))}
          </Select>
          <Typography color="error">
            {validator.current.message(
              "transportation_cost_per_person",
              customPlan.transportation_cost_per_person,
              "required"
            )}
          </Typography>
        </FormControl>

        {/* Food Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Food</InputLabel>
          <Select
            value={customPlan.food_cost_per_person || ""}
            onChange={(e) => {
              const selectedKey = foodOptions.find(option => option.cost === e.target.value)?.label || "";
              setSelectedFood(selectedKey);
              handleCustomPlanChange("food_cost_per_person", e.target.value);
              validator.current.showMessageFor("food_cost_per_person");
            }}
            label="Food"
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d1d1d1",
                },
                "&:hover fieldset": {
                  borderColor: "#6B26BB",
                },
              },
            }}
          >
            {foodOptions.map((option) => (
              <MenuItem key={option.label} value={option.cost}>
                {option.label} - {option.cost} $
              </MenuItem>
            ))}
          </Select>
          <Typography color="error">
            {validator.current.message("food_cost_per_person", customPlan.food_cost_per_person, "required")}
          </Typography>
        </FormControl>

        {/* Activities Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Activities</InputLabel>
          <Select
            value={customPlan.activities_cost_per_person || ""}
            onChange={(e) => {
              handleCustomPlanChange("activities_cost_per_person", e.target.value);
              validator.current.showMessageFor("activities_cost_per_person");
            }}
            label="Activities"
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d1d1d1",
                },
                "&:hover fieldset": {
                  borderColor: "#6B26BB",
                },
              },
            }}
          >
            {activitiesOptions.map((option) => (
              <MenuItem key={option.label} value={option.cost}>
                {option.label} - {option.cost} $
              </MenuItem>
            ))}
          </Select>
          <Typography color="error">
            {validator.current.message(
              "activities_cost_per_person",
              customPlan.activities_cost_per_person,
              "required"
            )}
          </Typography>
        </FormControl>

        {/* Other Costs Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Other Costs</InputLabel>
          <Select
            value={customPlan.others_cost_per_person || ""}
            onChange={(e) => {
              handleCustomPlanChange("others_cost_per_person", e.target.value);
              validator.current.showMessageFor("others_cost_per_person");
            }}
            label="Other Costs"
            sx={{
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d1d1d1",
                },
                "&:hover fieldset": {
                  borderColor: "#6B26BB",
                },
              },
            }}
          >
            {othersOptions.map((option) => (
              <MenuItem key={option.label} value={option.cost}>
                {option.label} - {option.cost} $
              </MenuItem>
            ))}
          </Select>
          <Typography color="error">
            {validator.current.message("others_cost_per_person", customPlan.others_cost_per_person, "required")}
          </Typography>
        </FormControl>

        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
          Total Custom Cost: {calculateTotalCustomCost()} $
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "12px",
            padding: "8px 20px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#6B26BB",
            },
          }}
          onClick={() => handleNextClick("Customized Plan")}
        >
          Next
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomBudgetPlanModal;

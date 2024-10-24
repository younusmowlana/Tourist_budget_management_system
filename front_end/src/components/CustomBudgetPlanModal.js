import React from "react";
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


const CustomBudgetPlanModal = ({
  open,
  onClose,
  predictionResponse,
  customPlan,
  setCustomPlan,
}) => {
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
            value={customPlan.accommodation || ""}
            onChange={(e) =>
              handleCustomPlanChange("accommodation", e.target.value)
            }
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
        </FormControl>

        {/* Transportation Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Transportation</InputLabel>
          <Select
            value={customPlan.transportation || ""}
            onChange={(e) =>
              handleCustomPlanChange("transportation", e.target.value)
            }
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
        </FormControl>

        {/* Food Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Food</InputLabel>
          <Select
            value={customPlan.food || ""}
            onChange={(e) => handleCustomPlanChange("food", e.target.value)}
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
        </FormControl>

        {/* Activities Cost Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Activities</InputLabel>
          <Select
            value={customPlan.activities || ""}
            onChange={(e) =>
              handleCustomPlanChange("activities", e.target.value)
            }
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
        </FormControl>

        {/* Other Costs Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Other Costs</InputLabel>
          <Select
            value={customPlan.others || ""}
            onChange={(e) => handleCustomPlanChange("others", e.target.value)}
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
        </FormControl>

        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
          Total Custom Cost: {calculateTotalCustomCost()} $
        </Typography>

        <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: '#000',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '8px 20px',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#6B26BB',
                        },
                      }}
                    >
                      Next
                    </Button>
      </Box>
    </Modal>
  );
};

export default CustomBudgetPlanModal;

import React from 'react';
import { 
  Box, Typography, Card, CardContent, Button, Grid, Stack, Divider, useTheme
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RowingIcon from '@mui/icons-material/Rowing';
import MoodIcon from '@mui/icons-material/Mood';
import './BudgetPlan.css';
import { useLocation } from 'react-router-dom';

const BudgetPlan = () => {
  const theme = useTheme();
  const location = useLocation();
  const { data } = location?.state || {}; 
  const predictionResponse = data?.predictionResponse || {};
  const {tripData} = location.state;


  const budgetCategories = [
    { label: 'Budget Friendly', key: 'Budget_Friendly' },
    { label: 'Mid Range Plan', key: 'Mid_Range' },
    { label: 'High End Plan', key: 'High_End' },
  ];

  return (
    <Box
      sx={{
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
        [theme.breakpoints.down('sm')]: {
          padding: '15px',
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          background: 'linear-gradient(to right, #1C1BA0, #6B26BB, #a069e0)',
          padding: '20px',
          borderRadius: '20px',
          marginBottom: '30px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: '10px',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.75rem',
            },
          }}
        >
          Colombo ➔ {tripData?.destination}
        </Typography>
        <Typography variant="h7" sx={{ color: '#ccc' }}>
          {tripData?.number_of_days} Days | {tripData?.visitor_count} People | ${tripData?.budget}
        </Typography>
      </Box>

      {/* Base Data Section */}
      <Card
        sx={{
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '30px',
          backgroundColor: '#fff',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
          width: '80%',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <BudgetDetailItem label="Total Budget" value={tripData?.budget} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BudgetDetailItem label="Head Count" value={tripData?.visitor_count} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <BudgetDetailItem label="Days to Stay" value={tripData?.number_of_days} />
          </Grid>
          
        </Grid>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: '#888', marginTop: '20px' }}
        >
          Budget plan is calculated per person*
        </Typography>
      </Card>

      {/* Budget Plan Cards */}
      <Grid container spacing={4} justifyContent="center">
        {budgetCategories
          .filter(category => predictionResponse[category.key])
          .map((category) => {
            const plan = predictionResponse[category.key];
            return (
              <Grid item xs={12} sm={6} md={4} key={category.key}>
                <Card
                  sx={{
                    borderRadius: '16px',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        [theme.breakpoints.down('sm')]: {
                          flexDirection: 'column',
                          textAlign: 'center',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: '#4e54c8' }}
                      >
                        {category.label}
                      </Typography>
                      <Typography
                        sx={{
                          background: 'linear-gradient(to right, #FBC676, #E35CC5)',
                          color: 'white',
                          padding: '6px 16px',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {plan?.total_cost} $
                      </Typography>
                    </Box>

                    <Divider sx={{ marginY: '15px' }} />

                    <Box>
                      {[
                        { label: 'Accommodation', value: plan?.accommodation_cost_per_person, icon: <HotelIcon /> },
                        { label: 'Transport', value: plan?.transportation_cost_per_person, icon: <DirectionsBusIcon /> },
                        { label: 'Foods', value: plan?.food_cost_per_person, icon: <FastfoodIcon /> },
                        { label: 'Activities', value: plan?.activities_cost_per_person, icon: <RowingIcon /> },
                        { label: 'Others', value: plan?.others_cost_per_person, icon: <MoodIcon /> },
                      ].map((item, index) => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          key={index}
                          sx={{ padding: '8px 0' }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            {item.icon}
                            <Typography>{item.label}</Typography>
                          </Stack>
                          <Typography>{item.value} $</Typography>
                        </Stack>
                      ))}
                    </Box>
                  </CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 20px',
                    }}
                  >
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
                </Card>
              </Grid>
            );
          })}
      </Grid>

      {/* Modal for Customizing Costs */}
    </Box>
  );
};

// Component to render individual budget details
const BudgetDetailItem = ({ label, value }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#4e54c8',
      }}
    >
      {label}
    </Typography>
    <Typography variant="h5" sx={{ color: '#333' }}>
      {value}
    </Typography>
  </Box>
);

export default BudgetPlan;

import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Stack, Divider, useTheme } from '@mui/material';
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
        padding: '20px',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
          maxWidth: '100%',
        },
      }}
    >
      <Typography
        className='topCardSec'
        variant="h4"
        sx={{
          background: 'linear-gradient(to right, #1C1BA0, #6B26BB, #a069e0)',
          width: '72vw',
          height: '20vh',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '16vh',
          textAlign: 'center',
          [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
          },
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '2vh',
        }}
      >
        Colombo ➔ {tripData?.destination}

        <Card
          className='baseDataSec'
          sx={{
            padding: '20px',
            borderRadius: '12px',
            marginTop: '8vh',
            marginBottom: '40px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
          }}
        >
          <Box
            sx={{
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <BudgetDetailItem label="Total Budget" value={tripData?.budget} />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <BudgetDetailItem label="Head Count" value={tripData?.visitor_count} />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <BudgetDetailItem label="Days to Stay" value={tripData?.number_of_days} />
  </Grid>
</Grid>

          </Box>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: '#888', marginTop: '20px' }}
          >
            Budget plan is calculated per person*
          </Typography>
        </Card>
      </Typography>

      <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
        {budgetCategories
          .filter(category => predictionResponse[category.key])
          .map((category) => {
            const plan = predictionResponse[category.key];
            return (
              <Grid item xs={12} sm={6} md={3} key={category.key}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
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
                          padding: '5px 12px',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          marginTop: '10px',
                          [theme.breakpoints.down('sm')]: {
                            marginTop: '10px',
                          },
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
                          sx={{ padding: '10px 0' }}
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
                      textAlign: 'right',
                      padding: '10px 20px',
                      [theme.breakpoints.down('sm')]: {
                        textAlign: 'center',
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        background: '#000000',
                        color: '#fff',
                        borderRadius: '16px',
                        padding: '8px 32px',
                        textTransform: 'none',
                        '&:hover': {
                          background: '#6B26BB',
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
    </Box>
  );
};

const BudgetDetailItem = ({ label, value }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Typography variant="body1" sx={{ color: '#4e54c8', fontSize: '1rem' }}>
      {label}
    </Typography>
    <Typography
      variant="h6"
      sx={{ color: '#333', fontWeight: 'bold', fontSize: '1.25rem' }}
    >
      {value}
    </Typography>
  </Box>
);

export default BudgetPlan;

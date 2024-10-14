import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Stack, Divider, useTheme } from '@mui/material';

const BudgetPlan = () => {
  const theme = useTheme();

  const budgetPlans = [
    {
      plan:"Budget Friendly Plan",
      id: 1,
      total: '19,500 LKR',
      accommodation: 8000,
      transport: 2300,
      foods: 8000,
      activities: 1000,
      others: 700,
    },
    {
      id: 2,
      plan:"Mid Range Budget Plan",
      total: '17,700 LKR',
      accommodation: 6000,
      transport: 2000,
      foods: 8000,
      activities: 1000,
      others: 700,
    },
  ];

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '900px', // Reduce maxWidth for smaller devices
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
          padding: '10px',
          maxWidth: '100%', // Allow full width on smaller screens
        },
      }}
    >
      {/* Header Section */}
      <Card
        sx={{
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '40px',
          backgroundColor: '#f7f7f7',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#4e54c8',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.5rem', // Reduce font size on small screens
            },
          }}
        >
          Colombo ➔ Ella
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '20px',
            gap: '15px',
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column', // Stack items vertically on small screens
              gap: '10px',
            },
          }}
        >
          <BudgetDetailItem label="Total Budget" value="100,000 LKR" />
          <BudgetDetailItem label="Head Count" value="5" />
          <BudgetDetailItem label="Budget per Person" value="20,000 LKR" />
          <BudgetDetailItem label="Days to Stay" value="3" />
        </Box>

        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: '#888', marginTop: '20px' }}
        >
          Budget plan is calculated per person*
        </Typography>
      </Card>

      {/* Budget Plans Section */}
      <Grid container spacing={2}> {/* Reduce spacing for mobile */}
        {budgetPlans.map((plan) => (
          <Grid item xs={12} sm={6} key={plan.id}>
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
                      flexDirection: 'column', // Stack items vertically on small screens
                      textAlign: 'center',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '#4e54c8' }}
                  >
                    {plan.plan}
                  </Typography>
                  <Typography
                    sx={{
                      background: 'linear-gradient(to right, #ffafbd, #ffc3a0)',
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      marginTop: '10px',
                      [theme.breakpoints.down('sm')]: {
                        marginTop: '10px', // Add spacing on mobile
                      },
                    }}
                  >
                    {plan.total}
                  </Typography>
                </Box>

                <Divider sx={{ marginY: '15px' }} />

                <Box>
                  {[
                    { label: 'Accommodation', value: plan.accommodation },
                    { label: 'Transport', value: plan.transport },
                    { label: 'Foods', value: plan.foods },
                    { label: 'Activities', value: plan.activities },
                    { label: 'Others', value: plan.others },
                  ].map((item, index) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      key={index}
                      sx={{ padding: '10px 0' }}
                    >
                      <Typography>{item.label}</Typography>
                      <Typography>{item.value} LKR</Typography>
                    </Stack>
                  ))}
                </Box>
              </CardContent>
              <Box
                sx={{
                  textAlign: 'right',
                  padding: '10px 20px',
                  [theme.breakpoints.down('sm')]: {
                    textAlign: 'center', // Center align button on small screens
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    background: '#4e54c8',
                    color: '#fff',
                    textTransform: 'none',
                    '&:hover': {
                      background: '#3533a2',
                    },
                  }}
                >
                  Next
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
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

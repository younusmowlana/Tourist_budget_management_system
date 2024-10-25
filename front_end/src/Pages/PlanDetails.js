import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Button,
} from "@mui/material";
import {
  Hotel as HotelIcon,
  PhotoLibrary as PhotoLibraryIcon,
  DirectionsBus as DirectionsBusIcon,
  Attractions as AttractionsIcon,
  Restaurant as RestaurantIcon,
  Fastfood as FastfoodIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const PlanDetails = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openAttractions, setOpenAttractions] = useState(false);
  const [openFoodPlaces, setOpenFoodPlaces] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClickOpenAttractions = () => setOpenAttractions(true);
  const handleClickOpenFoodPlaces = () => setOpenFoodPlaces(true);

  const handleClose = () => setOpen(false);
  const handleCloseAttractions = () => setOpenAttractions(false);
  const handleCloseFoodPlaces = () => setOpenFoodPlaces(false);

  const { data } = location?.state || {};

  console.log("data", data);

  return (
    <div style={{ margin: "4vw" }}>
  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
    <CardContent>
      {/* Main layout */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h6">{data[0]?.label}</Typography>
          <Typography variant="body2" color="textSecondary">
            Destination: {data[0]?.destination} | Days: {data[0]?.number_of_days}
          </Typography>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end">
          <Box
            sx={{
              backgroundColor: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
              borderRadius: 10,
              padding: "5px 10px",
            }}
          >
            <Typography
              sx={{
                background: "linear-gradient(to right, #FBC676, #E35CC5)",
                color: "white",
                padding: "5px 12px",
                borderRadius: "8px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Total Cost: ~${data[0]?.total_cost}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Hotel Section */}
      <Box mt={2}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <HotelIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="body1">
              <strong>Accommodation</strong>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickOpen}>
              <PhotoLibraryIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Typography variant="body2" color="textSecondary">
          {data[0]?.hotels[0]?.hotel_name}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Transport Section */}
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <DirectionsBusIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="body1">
              <strong>Transport</strong>
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" color="textSecondary">
          Transport By - {data[0]?.hotels[0]?.transport_by}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Nearby Attractions Section */}
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <AttractionsIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="body1">
              <strong>Nearby Attractions</strong>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickOpenAttractions}>
              <PhotoLibraryIcon />
            </IconButton>
          </Grid>
        </Grid>
        {data[0]?.hotels[0]?.near_by_attractions.map(
          (attraction, index) => (
            <Typography key={index} variant="body2" color="textSecondary">
              {attraction.name}
            </Typography>
          )
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Food Places Section */}
      <Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <RestaurantIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="body1">
              <strong>Food Places</strong>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClickOpenFoodPlaces}>
              <FastfoodIcon />
            </IconButton>
          </Grid>
        </Grid>
        {data[0]?.hotels[0]?.food_places.map((place, index) => (
          <Typography key={index} variant="body2" color="textSecondary">
            {place}
          </Typography>
        ))}
      </Box>

      {/* Button for Maps */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="contained"
          startIcon={<LocationOnIcon />}
          sx={{
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          Go to Maps
        </Button>
      </Box>
    </CardContent>
  </Card>

  {/* Modals for Images */}
  {/* Modal for Hotel Image */}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Hotel Images</DialogTitle>
    <DialogContent>
      <Box display="flex" gap={2}>
        {data[0]?.hotels[0]?.hotel_img?.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Hotel ${index + 1}`}
            style={{ width: "20vw", borderRadius: "8px" }}
          />
        ))}
      </Box>
    </DialogContent>
  </Dialog>

  {/* Modal for Nearby Attractions */}
  <Dialog open={openAttractions} onClose={handleCloseAttractions}>
    <DialogTitle>Nearby Attractions</DialogTitle>
    <DialogContent>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        {data[0]?.hotels[0]?.near_by_attractions?.map(
          (attraction, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <img
                src={attraction.img}
                alt={attraction.name}
                style={{ width: "20vw", borderRadius: "8px" }}
              />
              <Typography variant="body2" align="center">
                {attraction.name}
              </Typography>
            </Box>
          )
        )}
      </Box>
    </DialogContent>
  </Dialog>

  {/* Modal for Food Places */}
  <Dialog open={openFoodPlaces} onClose={handleCloseFoodPlaces}>
    <DialogTitle>Food Places</DialogTitle>
    <DialogContent>
      <Box display="flex" gap={2}>
        {data[0]?.hotels[0]?.img?.map((place, index) => (
          <img
            key={index}
            src={place}
            alt={`Food Place ${index + 1}`}
            style={{ width: "20vw", borderRadius: "8px" }}
          />
        ))}
      </Box>
    </DialogContent>
  </Dialog>
</div>

  );
};

export default PlanDetails;

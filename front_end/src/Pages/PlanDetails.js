import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Divider,
  Button,
  Modal,
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const PlanDetails = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openAttractions, setOpenAttractions] = useState(false);
  const [openFoodPlaces, setOpenFoodPlaces] = useState(false);

  const [mapOpen, setMapOpen] = useState(false);

  const handleMapOpen = () => setMapOpen(true);
  const handleMapClose = () => setMapOpen(false);

  const handleClickOpen = () => setOpen(true);
  const handleClickOpenAttractions = () => setOpenAttractions(true);
  const handleClickOpenFoodPlaces = () => setOpenFoodPlaces(true);

  const handleClose = () => setOpen(false);
  const handleCloseAttractions = () => setOpenAttractions(false);
  const handleCloseFoodPlaces = () => setOpenFoodPlaces(false);

  const { data } = location?.state || {};

  const destination = data[0]?.destination || "Colombo";
  // const mapsUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=Colombo&destination=${destination}`;
  const mapsUrl = `https://www.google.com/maps?q=Colombo+to+${destination}&output=embed`;

  console.log(data[0]);
  return (
    <div style={{ margin: "4vw" }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          {/* Main layout */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#4e54c8",
                  marginLeft: "8px",
                }}
              >
                {data[0]?.label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Destination: {data[0]?.destination} | Days:{" "}
                {data[0]?.number_of_days} | Visitor Count:{" "}
                {data[0]?.visitor_count}
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
            <Typography variant="body2" color="textSecondary">
              Room cost per person - ${data[0]?.accommodation_cost_per_person}
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

            <Typography variant="body2" color="textSecondary">
              Transport Up and Down cost - $
              {data[0]?.transportation_cost_per_person}
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
            <br />
            <Typography variant="body2" color="textSecondary">
              Activities costs per person - $
              {data[0]?.activities_cost_per_person}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Other costs per person - ${data[0]?.others_cost_per_person}
            </Typography>
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
              {data[0]?.type !== "Budget_Friendly" && (
                  <IconButton onClick={handleClickOpenFoodPlaces}>
                    <FastfoodIcon />
                  </IconButton>
                )}

              </Grid>
            </Grid>
            {data[0]?.hotels[0]?.food_places.map((place, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {place}
              </Typography>
            ))}
            <br />
            <Typography variant="body2" color="textSecondary">
              Foods and Beverages per person - ${data[0]?.food_cost_per_person}
            </Typography>
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
              onClick={handleMapOpen}
            >
              Go to Maps
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "70vw",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            Hotel Images
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {data[0]?.hotels[0]?.hotel_img?.map((imgSrc, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  component="img"
                  src={imgSrc}
                  alt={`Hotel ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>

      {/* Nearby Attractions Modal */}
      <Modal open={openAttractions} onClose={handleCloseAttractions}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "70vw",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            Nearby Attractions
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {data[0]?.hotels[0]?.near_by_attractions?.map(
              (attraction, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{
                      "& img": {
                        width: "100%",
                        height: "auto",
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: 6,
                        },
                      },
                    }}
                  >
                    <img src={attraction.img} alt={attraction.name} />
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "center", mt: 1 }}
                    >
                      {attraction.name}
                    </Typography>
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Modal>

      {/* Food Places Modal */}
      <Modal open={openFoodPlaces} onClose={handleCloseFoodPlaces}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "70vw",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", mb: 3 }}
          >
            Food Places
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {data[0]?.hotels[0]?.img?.map((place, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  component="img"
                  src={place}
                  alt={`Food Place ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={mapOpen}
        onClose={handleMapClose}
        aria-labelledby="map-modal-title"
        aria-describedby="map-modal-description"
      >
        <Box sx={style}>
          <iframe
            title="Google Maps"
            width="100%"
            height="500px"
            src={mapsUrl}
            allowFullScreen
          />
        </Box>
      </Modal>
    </div>
  );
};

export default PlanDetails;

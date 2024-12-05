import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
};

const TripFormModal = ({ open, trip, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    destination: "",
    destination_country: "",
    trip_start: "",
    trip_end: "",
    user_notified: [],
  });

  useEffect(() => {
    if (trip) {
      setFormData(trip);
    } else {
      setFormData({
        id: "",
        destination: "",
        country: "",
        trip_start: "",
        trip_end: "",
        user_notified: [],
      });
    }
  }, [trip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {trip ? "Edit Trip" : "Add Trip"}
        </Typography>
        {/* <TextField
          fullWidth
          margin="normal"
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
        /> */}
        <TextField
          fullWidth
          margin="normal"
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Destination Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Trip Start"
          name="trip_start"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.trip_start}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Trip End"
          name="trip_end"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.trip_end}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default TripFormModal;

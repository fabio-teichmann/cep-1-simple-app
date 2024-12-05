import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import axios from "axios";
import TripFormModal from "./TripsFormModal";

const API_BASE = "http://localhost:8000";

const TripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const fetchTrips = async () => {
        try {
            const response = await axios.get(`${API_BASE}/trips`);
            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    const handleAddTrip = () => {
        setSelectedTrip(null); // Clear selected trip
        setModalOpen(true);
    };

    const handleEditTrip = (trip) => {
        setSelectedTrip(trip);
        setModalOpen(true);
    };

    const handleDeleteTrip = async (id) => {
        try {
            await axios.delete(`${API_BASE}/trips/${id}`);
            fetchTrips();
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    const handleFormSubmit = async (trip) => {
        try {
            if (trip.id) {
                // Update existing trip
                await axios.put(`${API_BASE}/trips/${trip.id}`, trip);
            } else {
                // Create new trip
                console.log(trip)
                await axios.post(`${API_BASE}/trips/`, trip);
            }
            fetchTrips();
        } catch (error) {
            console.error("Error saving trip:", error);
        } finally {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    return (
        <Container>
            <Typography variant="h4" sx={{ marginTop: 3, marginBottom: 3 }}>
                Manage Trips
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddTrip}
                sx={{ marginBottom: 2 }}
            >
                Add New Trip
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>No.</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Notified</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trips.map((trip, index) => (
                        <TableRow key={trip.id}>
                            <TableCell>{trip.id}</TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{trip.destination}</TableCell>
                            <TableCell>{trip.country}</TableCell>
                            <TableCell>{trip.trip_start}</TableCell>
                            <TableCell>{trip.trip_end}</TableCell>
                            <TableCell>{trip.user_notified ? "Yes" : "No"}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEditTrip(trip)}
                                    sx={{ marginRight: 1 }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteTrip(trip.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TripFormModal
                open={isModalOpen}
                trip={selectedTrip}
                onClose={() => setModalOpen(false)}
                onSubmit={handleFormSubmit}
            />
        </Container>
    );
};

export default TripsPage;

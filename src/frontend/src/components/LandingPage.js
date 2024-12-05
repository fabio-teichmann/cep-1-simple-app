import React from "react";
import { Typography, Container } from "@mui/material";

const LandingPage = () => (
    <Container sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h3">Welcome to InTown!</Typography>
        <Typography variant="h5" sx={{ marginTop: 2 }}>
            Server: AWS Server - us-east-1
        </Typography>
    </Container>
);

export default LandingPage;

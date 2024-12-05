import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import TripsPage from "./components/TripsPage";
import theme from "./theme";

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/trips" element={<TripsPage />} />
            </Routes>
        </Router>
    </ThemeProvider>
);

export default App;

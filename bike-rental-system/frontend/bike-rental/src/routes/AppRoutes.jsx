import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";

import MainLayout from "../layout/MainLayout";
import BookingCard from "../components/BookingCard";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/cars"
        element={
          <MainLayout>
            <Cars /> 
          </MainLayout>
        }
      />

      <Route
        path="/car/:id"
        element={
          <MainLayout>
            <CarDetails />
          </MainLayout>
        }
      />

      <Route
        path="/booking"
        element={
          <MainLayout>
            <Booking />
          </MainLayout>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <MainLayout>
            <MyBookings />
          </MainLayout>
        }
      />
      <Route
        path="/booking-card"
        element={
          <MainLayout>
           <BookingCard/>
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

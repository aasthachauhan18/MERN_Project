import { useState } from "react";
import AuthFlow from "./pages/auth/AuthFlow";
import UserDashboard from "./pages/user/UserDashboard";
import BookBike from "./pages/user/BookBike";
import PaymentPage from "./pages/user/PaymentPage";
import BookingStatus from "./pages/user/BookingStatus";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  const [screen, setScreen]           = useState("login");
  const [loggedInUser, setLoggedInUser] = useState(null);   // { name, email, role }
  const [selectedBike, setSelectedBike] = useState(null);   // bike from dashboard
  const [bookingData, setBookingData]   = useState(null);   // { bike, days, total, startDate }
  const [myBookings, setMyBookings]     = useState([]);     // all confirmed bookings

  // Login success
  const handleLoginSuccess = (role, email) => {
    setLoggedInUser({ name: email.split("@")[0], email, role });
    setScreen(role === "admin" ? "adminDashboard" : "userDashboard");
  };

  // User clicks Book Now
  const handleBook = (bike) => {
    setSelectedBike(bike);
    setScreen("bookBike");
  };

  // User confirms booking → go to payment
  const handlePay = (booking) => {
    setBookingData(booking);
    setScreen("payment");
  };

  // Payment success → add to bookings list
  const handlePaySuccess = (confirmedBooking) => {
    setMyBookings(prev => [confirmedBooking, ...prev]);
    setScreen("bookingStatus");
  };

  // Logout — reset everything
  const handleLogout = () => {
    setLoggedInUser(null);
    setSelectedBike(null);
    setBookingData(null);
    setScreen("login");
  };

  return (
    <div>
      {screen === "login" && (
        <AuthFlow onLoginSuccess={handleLoginSuccess} />
      )}
      {screen === "userDashboard" && (
        <UserDashboard
          user={loggedInUser}
          onBook={handleBook}
          onMyBookings={() => setScreen("bookingStatus")}
          onLogout={handleLogout}
        />
      )}
      {screen === "bookBike" && (
        <BookBike
          bike={selectedBike}
          onBack={() => setScreen("userDashboard")}
          onPay={handlePay}
        />
      )}
      {screen === "payment" && (
        <PaymentPage
          booking={bookingData}
          onBack={() => setScreen("bookBike")}
          onSuccess={handlePaySuccess}
        />
      )}
      {screen === "bookingStatus" && (
        <BookingStatus
          user={loggedInUser}
          bookings={myBookings}
          onBack={() => setScreen("userDashboard")}
        />
      )}
      {screen === "adminDashboard" && (
        <AdminDashboard
          user={loggedInUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

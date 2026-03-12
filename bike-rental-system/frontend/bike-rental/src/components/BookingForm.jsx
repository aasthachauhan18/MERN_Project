import { useState } from "react";
import { Link } from "react-router-dom";

function BookingForm() {

  const [date, setDate] = useState("");

  return (
    <div className="card p-3">

      <h4>Book Car</h4>

      <input
        type="date"
        className="form-control mb-3"
        onChange={(e) => setDate(e.target.value)}
      />

      <Link to={"/booking-card"} className="btn btn-success">
        Confirm Booking
      </Link>

    </div>
  );
}

export default BookingForm;
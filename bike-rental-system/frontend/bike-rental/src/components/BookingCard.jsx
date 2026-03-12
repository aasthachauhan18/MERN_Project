function BookingCard({ booking }) {
  return (
    <div className="card p-3 mb-3">

      <h5>{booking.car}</h5>

      <p>Date: {booking.date}</p>

      <p>Status: {booking.status}</p>

    </div>
  );
}

export default BookingCard;
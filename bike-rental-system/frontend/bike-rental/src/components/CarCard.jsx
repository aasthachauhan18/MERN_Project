import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="card h-100 shadow-sm">

      <img src={car.image} className="card-img-top" />

      <div className="card-body">
        <h5>{car.name}</h5>

        <p>₹{car.price}/day</p>

        <Link to={`/car/${car.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>

    </div>
  );
}

export default CarCard;
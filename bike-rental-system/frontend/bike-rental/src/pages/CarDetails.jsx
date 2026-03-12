import { Link, useParams } from "react-router-dom";
import carsData from "../data/carsData";

function CarDetails() {

  const { id } = useParams();

  const car = carsData.find((c) => c.id === Number(id));

  return (
    <div>

      <img src={car.image} width="400" />

      <h2>{car.name}</h2>

      <p>Price: ₹{car.price}</p>

      <Link to={"/booking"} className="btn btn-success">
        Book Now
      </Link>

    </div>
  );
}

export default CarDetails;
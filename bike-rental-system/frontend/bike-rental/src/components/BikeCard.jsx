import {Link} from "react-router-dom";

function BikeCard({bike}){

return(

<div className="bg-white shadow-lg rounded-xl p-4">

<img
src={bike.image}
className="h-40 w-full object-cover rounded"
/>

<h3 className="text-lg font-bold mt-2">
{bike.bikeName}
</h3>

<p>{bike.brand}</p>

<p className="text-yellow-600 font-bold">
₹{bike.pricePerHour}/hour
</p>

<Link
to={`/bike/${bike._id}`}
className="bg-yellow-400 block text-center mt-3 p-2 rounded"
>
View Details
</Link>

</div>

);

}

export default BikeCard;
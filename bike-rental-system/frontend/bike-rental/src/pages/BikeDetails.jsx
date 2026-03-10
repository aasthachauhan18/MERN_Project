import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import API from "../services/api";
import {Link} from "react-router-dom";

function BikeDetails(){

const {id} = useParams();
const [bike,setBike] = useState({});

useEffect(()=>{

API.get(`/bikes/${id}`)
.then(res=>setBike(res.data));

},[id]);

return(

<div className="p-10 flex gap-10">

<img
src={bike.image}
className="w-96"
/>

<div>

<h2 className="text-3xl font-bold">
{bike.bikeName}
</h2>

<p className="mt-2">{bike.brand}</p>

<p className="text-yellow-600 text-xl mt-2">
₹{bike.pricePerHour}/hour
</p>

<Link
to={`/booking/${bike._id}`}
className="bg-yellow-400 p-3 inline-block mt-5"
>
Book Now
</Link>

</div>

</div>

);

}

export default BikeDetails;
import {useEffect,useState} from "react";
import API from "../services/api";

function UserDashboard(){

const [bookings,setBookings] = useState([]);

useEffect(()=>{

API.get("/bookings/my")
.then(res=>setBookings(res.data));

},[]);

return(

<div className="p-10">

<h2 className="text-2xl font-bold">
My Bookings
</h2>

{bookings.map(b=>(
<div
key={b._id}
className="border p-4 mt-3"
>

<p>Bike: {b.bikeId.bikeName}</p>
<p>Status: {b.status}</p>

</div>
))}

</div>

);

}

export default UserDashboard;
import {useEffect,useState} from "react";
import API from "../services/api";
import BikeCard from "../components/BikeCard";

function Bikes(){

const [bikes,setBikes] = useState([]);

useEffect(()=>{

API.get("/bikes")
.then(res=>setBikes(res.data));

},[]);

return(

<div className="p-8 grid grid-cols-3 gap-6">

{bikes.map(bike=>(
<BikeCard key={bike._id} bike={bike}/>
))}

</div>

);

}

export default Bikes;
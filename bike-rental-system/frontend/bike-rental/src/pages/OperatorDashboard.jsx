import {useState} from "react";
import API from "../services/api";

function OperatorDashboard(){

const [bikeName,setBikeName] = useState("");

const addBike = async()=>{

await API.post("/bikes",{
bikeName
});

alert("Bike Added");

};

return(

<div className="p-10">

<h2 className="text-2xl font-bold">
Operator Panel
</h2>

<input
className="border p-2"
placeholder="Bike Name"
onChange={(e)=>setBikeName(e.target.value)}
/>

<button
onClick={addBike}
className="bg-yellow-400 p-2 ml-3"
>
Add Bike
</button>

</div>

);

}

export default OperatorDashboard;
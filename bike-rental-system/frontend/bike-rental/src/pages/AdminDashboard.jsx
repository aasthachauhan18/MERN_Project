import {useEffect,useState} from "react";
import API from "../services/api";
import {BarChart,Bar,XAxis,YAxis,Tooltip} from "recharts";

function AdminDashboard(){

const [data,setData] = useState([]);

useEffect(()=>{

API.get("/admin/dashboard")
.then(res=>setData(res.data));

},[]);

return(

<div className="p-10">

<h2 className="text-2xl font-bold">
Admin Analytics
</h2>

<BarChart width={500} height={300} data={data}>

<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>

<Bar dataKey="value"/>

</BarChart>

</div>

);

}

export default AdminDashboard;
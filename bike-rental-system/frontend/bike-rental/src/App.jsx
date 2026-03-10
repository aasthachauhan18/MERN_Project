import {BrowserRouter,Routes,Route} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Bikes from "./pages/Bikes";
import BikeDetails from "./pages/BikeDetails";
import Booking from "./pages/Booking";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/bikes" element={<Bikes/>}/>
<Route path="/bike/:id" element={<BikeDetails/>}/>
<Route path="/booking/:id" element={<Booking/>}/>

<Route path="/dashboard" element={<UserDashboard/>}/>
<Route path="/operator" element={<OperatorDashboard/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;
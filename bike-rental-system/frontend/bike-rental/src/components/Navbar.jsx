import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function Navbar(){

const {user,logout} = useContext(AuthContext);

return(

<nav className="bg-black text-white flex justify-between p-4">

<div className="text-xl font-bold">
BikeRent
</div>

<div className="space-x-4">

<Link to="/">Home</Link>
<Link to="/bikes">Bikes</Link>

{!user && <Link to="/login">Login</Link>}

{user && (
<>
<Link to="/dashboard">Dashboard</Link>
<button onClick={logout}>Logout</button>
</>
)}

</div>

</nav>

);

}

export default Navbar;
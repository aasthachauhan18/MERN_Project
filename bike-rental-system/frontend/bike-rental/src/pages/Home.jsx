import {Link} from "react-router-dom";

function Home(){

return(

<div>

<section className="bg-yellow-400 p-20 text-center">

<h1 className="text-4xl font-bold">
Rent Bikes Instantly
</h1>

<p className="mt-4">
Affordable rides anytime anywhere
</p>

<Link
to="/bikes"
className="bg-black text-white px-6 py-3 mt-6 inline-block"
>
Explore Bikes
</Link>

</section>

</div>

);

}

export default Home;
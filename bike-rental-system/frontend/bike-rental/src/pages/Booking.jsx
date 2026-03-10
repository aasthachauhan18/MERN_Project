import {useState} from "react";
import BookingCalendar from "../components/BookingCalender";
import API from "../services/api";

function Booking(){

const [date,setDate] = useState();

const bookBike = async()=>{

await API.post("/bookings/book",{
startDate:date,
endDate:date,
totalPrice:500
});

alert("Booking Success");

};

return(

<div className="p-10">

<h2 className="text-2xl font-bold">
Select Booking Date
</h2>

<BookingCalendar setDate={setDate}/>

<button
onClick={bookBike}
className="bg-yellow-400 p-3 mt-4"
>
Confirm Booking
</button>

</div>

);

}

export default Booking;
import Calendar from "react-calendar";
import {useState} from "react";

function BookingCalendar({setDate}){

const [value,setValue] = useState(new Date());

const handleChange = (date)=>{
setValue(date);
setDate(date);
};

return(

<div>

<Calendar
onChange={handleChange}
value={value}
/>

</div>

);

}

export default BookingCalendar;
import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

function WaitingTime(){

const [doctorId,setDoctorId]=useState("");
const [date,setDate]=useState("");
const [data,setData]=useState([]);

const getWaitingTime=()=>{

api.get("/api/appointments/waiting-time",{params:{doctorId,date}})
.then(res=>setData(res.data));

};

return(

<PageContainer>

<Typography variant="h5">Waiting Time</Typography>

<TextField
label="Doctor ID"
onChange={(e)=>setDoctorId(e.target.value)}
/>

<br/><br/>

<TextField
label="Date"
type="date"
InputLabelProps={{ shrink:true }}
onChange={(e)=>setDate(e.target.value)}
/>

<br/><br/>

<Button variant="contained" onClick={getWaitingTime}>
Check Waiting Time
</Button>

<br/><br/>

{data.map((d,i)=>( <Typography key={i}>
{d} </Typography>
))}

</PageContainer>

);

}

export default WaitingTime;

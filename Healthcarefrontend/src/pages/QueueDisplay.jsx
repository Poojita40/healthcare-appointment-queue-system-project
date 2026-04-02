import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

import {
TextField,
Button,
Typography,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Paper,
Stack
} from "@mui/material";

function QueueDisplay(){

const [doctorId,setDoctorId] = useState("");
const [date,setDate] = useState("");
const [queue,setQueue] = useState([]);

const getQueue = ()=>{

api.get("/appointments/queue",{
params:{doctorId,date}
})
.then(res=>setQueue(res.data));

};

return(

<PageContainer>

<Typography variant="h5" gutterBottom>
Doctor Queue
</Typography>

<Stack spacing={2} direction="row" marginBottom={3}>

<TextField
label="Doctor ID"
value={doctorId}
onChange={(e)=>setDoctorId(e.target.value)}
/>

<TextField
label="Date"
type="date"
InputLabelProps={{ shrink:true }}
value={date}
onChange={(e)=>setDate(e.target.value)}
/>

<Button variant="contained" onClick={getQueue}>
Show Queue
</Button>

</Stack>

<TableContainer component={Paper}>

<Table>

<TableHead>

<TableRow>

<TableCell>Queue No</TableCell>
<TableCell>Patient</TableCell>
<TableCell>Problem</TableCell>
<TableCell>Status</TableCell>

</TableRow>

</TableHead>

<TableBody>

{queue.map((q)=>(
<TableRow key={q.id}>

<TableCell>{q.queueNumber}</TableCell>
<TableCell>{q.patient.name}</TableCell>
<TableCell>{q.problem}</TableCell>
<TableCell>{q.status}</TableCell>

</TableRow>
))}

</TableBody>

</Table>

</TableContainer>

</PageContainer>

);

}

export default QueueDisplay;
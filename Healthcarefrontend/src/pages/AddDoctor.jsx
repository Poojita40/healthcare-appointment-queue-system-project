import { TextField, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

function AddDoctor(){

const [doctor,setDoctor] = useState({
name:"",
specialization:"",
available:true
});

const handleChange=(e)=>{
setDoctor({...doctor,[e.target.name]:e.target.value});
};

const submitDoctor=()=>{

api.post("/api/doctors",doctor)
.then(()=>alert("Doctor Added"))
.catch(err => console.error(err));

};

return(

<PageContainer>

<Typography variant="h5">Add Doctor</Typography>

<Stack spacing={2} marginTop={2}>

<TextField label="Doctor Name" name="name" onChange={handleChange}/>

<TextField label="Specialization" name="specialization" onChange={handleChange}/>

<Button variant="contained" onClick={submitDoctor}>
Add Doctor
</Button>

</Stack>

</PageContainer>

);

}

export default AddDoctor;
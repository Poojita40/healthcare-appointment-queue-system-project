import { useEffect, useState } from "react";
import axios from "axios";

function PatientDashboard() {

  const [queue, setQueue] = useState(null);

  useEffect(() => {

    const patientId = localStorage.getItem("patientId");

    axios
      .get(`https://healthcare-backend-api-vnfk.onrender.com/api/patient/queue/${patientId}`)
      .then((res) => {
        setQueue(res.data);
      })
      .catch(() => {
        alert("Queue not found");
      });

  }, []);

  return (

    <div style={{ textAlign: "center", marginTop: "60px" }}>

      <h2>Your Queue Status</h2>

      {queue && (

        <div>

          <h3>Doctor: {queue.doctor}</h3>

          <p>Queue Number: {queue.queueNumber}</p>

          <p>Current Serving: {queue.currentServing}</p>

          <p>Estimated Waiting Time: {queue.estimatedTime} minutes</p>

        </div>

      )}

    </div>

  );

}

export default PatientDashboard;
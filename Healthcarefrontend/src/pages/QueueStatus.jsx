import { useState } from "react";
import axios from "axios";

function QueueStatus() {

  const [phone, setPhone] = useState("");
  const [queue, setQueue] = useState(null);

  const checkQueue = async () => {
    try {

      const res = await axios.get(
        `https://healthcare-backend-api-vnfk.onrender.com/api/queue/${phone}`
      );

      setQueue(res.data);

    } catch (error) {
      console.error(error); // ✅ added for debugging
      alert("Patient not found");
    }
  };

  return (

    <div style={{ textAlign: "center", marginTop: "60px" }}>

      <h2>Check Your Queue Status</h2>

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

      <button onClick={checkQueue} style={{ padding: "10px 20px" }}>
        Check Status
      </button>

      {queue && (

        <div style={{ marginTop: "30px" }}>

          <h3>Patient: {queue.patientName}</h3>
          <p>Doctor: {queue.doctor}</p>
          <p>Queue Number: {queue.queueNumber}</p>
          <p>Currently Serving: {queue.currentServing}</p>
          <p>Estimated Waiting Time: {queue.estimatedTime} minutes</p>

        </div>

      )}

    </div>
  );
}

export default QueueStatus;
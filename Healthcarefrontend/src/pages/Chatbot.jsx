import React, { useState, useEffect } from "react";
import { sendMessage } from "../api/api";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("sessionId")) {
            localStorage.setItem("sessionId", Date.now().toString());
        }
    }, []);

    const handleSend = async () => {
        if (!message.trim()) return;

        // ✅ store user message
        setChat(prev => [...prev, { user: message }]);

        try {
            const res = await sendMessage(message);

            // ✅ safe access (prevents crash if reply missing)
            const reply = res?.data?.reply || "No response";

            setChat(prev => [...prev, { bot: reply }]);
        } catch (error) {
            console.error(error); // ✅ added for debugging
            setChat(prev => [...prev, { bot: "Server error ❌" }]);
        }

        setMessage("");
    };

    return (
        <>
            <div
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    background: "#3182ce",
                    color: "#fff",
                    padding: "15px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    zIndex: 9999
                }}
            >
                💬
            </div>

            {open && (
                <div style={{
                    position: "fixed",
                    bottom: "80px",
                    right: "20px",
                    width: "320px",
                    height: "420px",
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{ background: "#3182ce", color: "#fff", padding: "10px" }}>
                        🤖 Healthcare Assistant
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
                        {chat.map((c, i) => (
                            <div key={i}>
                                {c.user && (
                                    <p style={{ textAlign: "right" }}>
                                        <b>You:</b> {c.user}
                                    </p>
                                )}
                                {c.bot && (
                                    <p>
                                        <b>Bot:</b> {c.bot}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex" }}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type here..."
                            style={{ flex: 1, padding: "10px" }}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chatbot;
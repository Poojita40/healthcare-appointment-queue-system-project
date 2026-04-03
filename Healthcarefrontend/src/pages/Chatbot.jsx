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
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 9999,
                    overflow: "hidden"
                }}>
                    <div style={{ background: "#3182ce", color: "#fff", padding: "15px", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>🤖 Healthcare Assistant</span>
                        <div 
                            onClick={() => setOpen(false)}
                            style={{ cursor: "pointer", background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}
                        >
                            ✕
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        {chat.map((c, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: c.user ? "flex-end" : "flex-start" }}>
                                {c.user && (
                                    <div style={{ background: "#3182ce", color: "#fff", padding: "10px 14px", borderRadius: "18px 18px 0px 18px", maxWidth: "80%", wordWrap: "break-word" }}>
                                        {c.user}
                                    </div>
                                )}
                                {c.bot && (
                                    <div style={{ background: "#f1f5f9", color: "#1e293b", padding: "10px 14px", borderRadius: "18px 18px 18px 0px", maxWidth: "80%", wordWrap: "break-word" }}>
                                        {c.bot}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", padding: "10px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type here..."
                            style={{ flex: 1, padding: "10px 15px", borderRadius: "20px", border: "1px solid #cbd5e1", outline: "none", boxSizing: "border-box" }}
                        />
                        <button 
                            onClick={handleSend} 
                            style={{ marginLeft: "10px", padding: "10px 20px", borderRadius: "20px", border: "none", background: "#3182ce", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Chatbot;
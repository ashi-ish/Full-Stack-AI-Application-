"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState("");
  const [streamResponse, setStreamResponse] = useState("");

  const handleChat = async () => {
    setLoading(true);
    setStreamResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Error: " + error.message);
    }

    setLoading(false);
  };

  const handleStream = async () => {
    setStreaming(true);
    setStreamResponse("");
    try {
      const res = await fetch("/api/chat-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let done, value;
      while (true) {
        ({ done, value } = await reader.read());
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              setStreamResponse((prev) => prev + (data.content || ""));
            } catch (e) {
              // ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      setStreamResponse("Error: " + error.message);
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "2rem",
            marginBottom: "8px",
            color: "#222",
          }}
        >
          AI Chat App
        </h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            fontSize: "1rem",
            marginBottom: "8px",
            resize: "vertical",
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleChat}
            style={{
              padding: "10px 24px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#1e40af")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
          >
            {loading ? "Loading..." : "Chat"}
          </button>
          <button
            onClick={handleStream}
            style={{
              padding: "10px 24px",
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(34,197,94,0.08)",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#15803d")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#22c55e")}
          >
            {loading ? "Loading..." : "Stream Chat"}
          </button>
        </div>
        <div
          style={{
            background: "#f3f4f6",
            borderRadius: "8px",
            padding: "16px",
            minHeight: "48px",
            fontSize: "1.1rem",
            color: "#222",
            fontFamily: "inherit",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </div>
        <div
          style={{
            background: "#e0f7fa",
            borderRadius: "8px",
            padding: "16px",
            minHeight: "48px",
            fontSize: "1.1rem",
            color: "#222",
            fontFamily: "inherit",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            whiteSpace: "pre-wrap",
          }}
        >
          {streamResponse}
        </div>
      </div>
    </div>
  );
}

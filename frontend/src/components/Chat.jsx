

import React, { useState, useRef, useEffect } from "react";
import { askQuestion } from "../api";
import { startSpeechRecognition } from "./Speech";

function Chat({ documentReady }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async () => {

    if (!documentReady) return alert("Upload doc first");
    if (!question.trim()) return;

    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await askQuestion(question);
      console.log(res)

      const botMsg = {
        type: "bot",
        text: res.answer,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      alert("Error getting answer");
    }

    setLoading(false);
    setQuestion("");
  };

  const handleVoice = () => {
    setListening(true);

    startSpeechRecognition(
      async (speechText) => {
        setQuestion(speechText);

        const userMsg = {
          type: "user",
          text: speechText,
        };

        setMessages((prev) => [...prev, userMsg]);

        setLoading(true);

        try {
          const res = await askQuestion(speechText);

          const botMsg = {
            type: "bot",
            text: res.answer,
          };

          setMessages((prev) => [...prev, botMsg]);
        } catch {
          alert("Error");
        }

        setLoading(false);
        setListening(false);
      },
      () => {
        setListening(false);
        alert("Voice error");
      }
    );
  };

  return (
    <div className="mt-5">

      {/* 💬 Heading */}
      <h2 className="text-white text-sm font-semibold mb-3">
        💬 Ask Question
      </h2>

      {/* 🎧 Listening */}
      {listening && (
        <p className="text-yellow-400 text-sm mb-2 animate-pulse">
          🎧 Listening...
        </p>
      )}

      {/* 🔥 Input Section */}
      <div className="flex gap-2 items-center">

        <input
          className="flex-1 p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask something..."
        />

        {/* Ask Button */}
        <button
          onClick={handleAsk}
          className="bg-green-600 px-5 py-3 rounded-lg text-sm text-white hover:bg-green-700 transition shadow-md"
        >
          Ask
        </button>

        {/* Voice Button */}
        <button
          onClick={handleVoice}
          className={`px-4 py-3 rounded-lg size-11 text-white transition shadow-md ${
            listening
              ? "bg-red-500"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          🎤
        </button>
      </div>

      {/* 🤖 Loading */}
      {loading && (
        <p className="text-gray-300 mt-4 animate-pulse">
          🤖 Generating answer...
        </p>
      )}

      {/* 🧠 Generated Answers */}
      <div className="mt-6 space-y-5">

        {messages.length === 0 && !loading && (
          <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700 text-center text-gray-400">
            Ask questions about your uploaded document...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-slate-800/50 backdrop-blur-md p-5 rounded-xl border border-slate-700 shadow-lg"
          >

            {msg.type === "user" ? (
              <p className="text-green-400 font-semibold mb-3">
                ❓ {msg.text}
              </p>
            ) : (
              <div className="text-white leading-8 whitespace-pre-line">
                🤖 {msg.text}
              </div>
            )}

          </div>
        ))}

        {/* Auto Scroll Ref */}
        <div ref={chatEndRef}></div>

      </div>
    </div>
  );
}

export default Chat;

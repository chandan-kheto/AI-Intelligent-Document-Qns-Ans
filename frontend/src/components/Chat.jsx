
import React, { useState, useRef, useEffect } from "react";
import { askQuestion } from "../api";
import { startSpeechRecognition } from "./Speech";

function Chat({ documentReady }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!documentReady) return alert("Upload doc first");
    if (!question.trim()) return;

    const userMsg = { type: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await askQuestion(question);

      const botMsg = { type: "bot", text: res.answer };
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

        const userMsg = { type: "user", text: speechText };
        setMessages((prev) => [...prev, userMsg]);

        setLoading(true);

        try {
          const res = await askQuestion(speechText);

          const botMsg = { type: "bot", text: res.answer };
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
    <div>
      <h2 className="text-white font-semibold mb-2">💬 Ask Question</h2>

      <div className="bg-gray-700/60 backdrop-blur-md p-3 rounded-lg h-120 overflow-y-auto mb-3 border border-gray-600">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] ${
                msg.type === "user"
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-600 text-white placeholder-gray-400"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
        />

        <button
          onClick={handleAsk}
          className="bg-green-600 px-4 rounded hover:bg-green-700" >Ask
        </button>

        <button
         onClick={handleVoice}
         className={`px-3 rounded ${ listening ? "bg-red-500" : "bg-purple-600 hover:bg-purple-700"}`}>🎤
        </button>

        {listening && ( <p className="text-yellow-400 text-sm mb-2"> 🎧 Listening...</p>)}

      </div>
    </div>
  );
}

export default Chat;
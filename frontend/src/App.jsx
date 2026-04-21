import React, { useState } from "react";
import Upload from "./components/Upload";
import Chat from "./components/Chat";

function App() {
  const [documentReady, setDocumentReady] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex justify-center items-center p-4">

      {/* Glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-30 blur-3xl rounded-full top-0 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="relative w-full max-w-5xl bg-gray-800/70 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700">

        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-400 via-purple-300 to-blue-400 bg-clip-text text-transparent drop-shadow-xl">
          🧠 AI Document Intelligence (RAG)
        </h1>

        <p className="text-center text-gray-200 mb-25 text-m">
          Upload documents and ask intelligent questions using LLM + RAG
         </p>

        <Upload setDocumentReady={setDocumentReady} />

        <hr className="my-4 border-gray-600" />

        <Chat documentReady={documentReady} />

      </div>
    </div>
  );
}

export default App;
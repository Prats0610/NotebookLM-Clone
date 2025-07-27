import { useState } from "react";
import axios from "axios";

export default function ChatSidebar({ totalPages }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) return;
    const res = await axios.post("http://localhost:5000/api/chat", {
      question,
    });
    setResponse(res.data);
  };

  return (
    <div className="w-1/3 bg-white p-6 overflow-y-auto border-r border-gray-300">
      <div className="bg-purple-50 text-purple-800 p-4 rounded mb-4">
        <p className="font-semibold">Your document is ready!</p>
        <ul className="text-sm mt-2 list-disc ml-5">
          <li>What is the main topic?</li>
          <li>Can you summarize?</li>
          <li>What are the conclusions?</li>
        </ul>
      </div>

      {response && (
        <div className="bg-purple-100 p-3 rounded mb-4">
          <p>{response.answer}</p>
          <div className="text-sm mt-2">
            {response.citations.map((page, i) => (
              <button
                key={i}
                onClick={() =>
                  document
                    .getElementById(`page_${page}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-purple-700 underline mr-2"
              >
                Page {page}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about the document..."
          className="flex-1 border rounded-l px-3 py-2 text-sm"
        />
        <button
          onClick={handleAsk}
          className="bg-purple-600 text-white px-4 rounded-r text-sm"
        >
          Ask
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

function Chat({ disabled }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleAsk = async () => {
    if (disabled || !question.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chat`,
        {
          question,
        }
      );
      setResponse(res.data);
    } catch (err) {
      alert("Make sure you've uploaded a PDF first.");
      console.error("Chat Error:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-md mx-auto">
      {/* Suggestions box */}
      <div className="bg-purple-50 text-purple-800 p-4 rounded mb-4">
        <p className="font-semibold">Your document is ready!</p>
        <ul className="text-sm mt-2 list-disc ml-5">
          <li>What is the main topic?</li>
          <li>Can you summarize?</li>
          <li>What are the conclusions?</li>
        </ul>
      </div>

      {/* Chat input */}
      <div className="flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 text-sm"
          placeholder="Ask about the document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={disabled}
        />
        <button
          onClick={handleAsk}
          disabled={disabled}
          className={`px-4 py-2 text-sm font-medium rounded-r ${
            disabled
              ? "bg-gray-300 text-gray-700"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          Ask
        </button>
      </div>

      {/* Chat response */}
      {response && (
        <div className="mt-4 bg-purple-100 p-4 rounded text-sm">
          <p>{response.answer}</p>
          <div className="mt-2">
            {response.citations.map((page, idx) => (
              <button
                key={idx}
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
    </div>
  );
}

export default Chat;

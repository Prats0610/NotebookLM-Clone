const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function chatWithLLM(question, contextPages) {
  const contextText = contextPages
    .map((p) => `Page ${p.page}:\n${p.content}`)
    .join("\n\n");
  const prompt = `Use the context below to answer:\n\n${contextText}\n\nQ: ${question}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  return {
    answer: res.choices[0].message.content,
    citations: contextPages.map((p) => p.page),
  };
}

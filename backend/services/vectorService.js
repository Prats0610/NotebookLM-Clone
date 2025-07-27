const { OpenAI } = require("openai");
const { OPENAI_API_KEY } = require("../config");
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
let vectorStore = [];

async function embedPages(pages) {
  vectorStore = [];
  for (let i = 0; i < pages.length; i++) {
    const content = pages[i];
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: content,
    });
    vectorStore.push({
      page: i + 1,
      content,
      embedding: embedding.data[0].embedding,
    });
  }
}

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (magA * magB);
}

function searchRelevantPages(questionEmbedding) {
  return vectorStore
    .map((entry) => ({
      ...entry,
      score: cosineSimilarity(entry.embedding, questionEmbedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

module.exports = { embedPages, searchRelevantPages };

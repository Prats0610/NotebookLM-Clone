const express = require("express");
const multer = require("multer");
const { parsePdf } = require("../services/pdfService");
const {
  embedPages,
  searchRelevantPages,
} = require("../services/vectorService");
const { chatWithLLM } = require("../services/chatService");

const router = express.Router();
const upload = multer({ dest: "uploads/" });
let storedPages = [];

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const pages = await parsePdf(req.file.path);
    storedPages = pages;
    console.log("Received upload:", req.file?.originalname);

    await embedPages(pages);
    res.json({ success: true, pages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/chat", async (req, res) => {
  const { question } = req.body;

  if (!storedPages.length) {
    return res
      .status(400)
      .json({ error: "No PDF uploaded. Please upload a PDF first." });
  }

  const context = searchRelevantPages(question);
  const answer = await chatWithLLM(question, context);
  res.json(answer);
});

module.exports = router;

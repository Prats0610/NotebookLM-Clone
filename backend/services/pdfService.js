const fs = require("fs");
const pdfParse = require("pdf-parse");

async function parsePdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text.split(/\f/);
}

module.exports = { parsePdf };

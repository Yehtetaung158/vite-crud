// api/data.js
const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const filePath = path.resolve('.', 'data.json');
  const jsonData = fs.readFileSync(filePath);
  const objectData = JSON.parse(jsonData);

  res.status(200).json(objectData);
}

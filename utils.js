import fs from "fs/promises";

async function readFile(filePath, isParsed) {
  if (!filePath) return;
  const data = await fs.readFile(filePath, "utf-8");
  return isParsed ? JSON.parse(data) : data;
}

async function writeFile(path, data, isParsed) {
  if (!path || !data) return;
  await fs.writeFile(path, isParsed ? JSON.stringify(data) : data);
}

export { writeFile, readFile };

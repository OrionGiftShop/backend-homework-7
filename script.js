import fetch from "node-fetch";
import http from "http";
import url from "url";
import queryString from "querystring";
import { readFile, writeFile } from "./utils.js";
async function main() {
  const resp = await fetch("https://dummyjson.com/users ");
  const data = await resp.json();
  await writeFile("users.json", data.users, true);
}
main();

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const queryParams = queryString.parse(parsedUrl.query);

  if (parsedUrl.pathname === "/users") {
    try {
      const users = await readFile("users.json", true);
      console.log(users);

      let filteredUsers = users;

      if (queryParams.age) {
        filteredUsers = users.filter(
          (el) => el.age === parseInt(queryParams.age)
        );
      } else if (queryParams.gender) {
        filteredUsers = users.filter((el) => el.gender === queryParams.gender);
      }

      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(filteredUsers));
      res.end();
      return;
    } catch (error) {
      res.write(JSON.stringify({ error: "Error reading user data" }));
      res.end();
      console.error("Error:", error);
    }
  } else {
    res.end("Hello world");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

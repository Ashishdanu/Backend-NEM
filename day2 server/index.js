const http = require("http");

const server = http.createServer((request, response) => {
  console.log("Req:", {
    method: req.method,
    url: req.url,
  });

  if (req.url === "/Hello") {
    return response.end("hello moto");
  }
  if (req.url == "/hi") {
    return response.end("hi moto");
  }

  if (req.url.startsWith("/user")) {
    const id = req.url.split("/");

    const username = id[2];

    return response.end(`hiii ${username}`);
  }

  return response.end(JSON.stringify([1, 2, 3, 4]));
});
server.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});

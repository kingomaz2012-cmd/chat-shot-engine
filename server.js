import { createServer } from "node:http";

const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      status: "online",
      app: "Chat Shot Engine"
    }));
  }

  if (req.method === "POST") {
    try {
      let data = "";
      for await (const chunk of req) data += chunk;

      const body = JSON.parse(data);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        reply: "وصلت رسالتك إلى محرك Chat Shot بنجاح.",
        received: body.message || ""
      }));
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  }

  res.writeHead(405);
  res.end();
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Chat Shot Engine running on port ${PORT}`);
});

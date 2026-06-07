import http from "http";
import { URL } from "url";

const PORT = Number(process.env.PORT ?? 3001);

const sendJson = (res: http.ServerResponse, statusCode: number, data: unknown) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(data));
};

const sendHtml = (res: http.ServerResponse, html: string) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
};

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    return res.end();
  }

  if (url.pathname === "/api/message") {
    return sendJson(res, 200, {
      message: "Hello from ts-app backend!",
      timestamp: new Date().toISOString()
    });
  }

  if (url.pathname === "/api/info") {
    return sendJson(res, 200, {
      app: "ts-app backend",
      status: "running",
      port: PORT
    });
  }

  return sendHtml(res, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ts-app Backend</title>
  </head>
  <body>
    <h1>ts-app Backend</h1>
    <p>The backend service is running on port ${PORT}.</p>
    <p>Use <code>/api/message</code> and <code>/api/info</code> for JSON responses.</p>
  </body>
</html>
  `);
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

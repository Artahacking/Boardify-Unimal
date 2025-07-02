import { WebSocketServer } from "ws";
import { WebSocket } from "ws";

// Ganti port 8080 dengan 8081 (atau port lain yang tidak digunakan)
const wss = new WebSocketServer({ port: 8081, host: '0.0.0.0' });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const data = message.toString();
    console.log("Received:", data);

    // Kirim data ke semua client yang terhubung
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log("WebSocket server is running on ws://localhost:8081"); // Sesuaikan dengan port yang dipilih

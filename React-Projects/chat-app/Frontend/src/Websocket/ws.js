import {io} from "socket.io-client"

export function connectWS() {
    return io("https://chat-app-yzez.onrender.com", {
      transports: ["websocket", "polling"], // 🔥 mobile & render fix
      withCredentials: true,
      secure: true,
      reconnection: true,
      reconnectionAttempts: 5,
    });
}

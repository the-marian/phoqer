from typing import Dict

import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
        self.active_chats: Dict[int, tuple] = {
            1: (1, 2),
            2: (3, 4)
        }

    async def connect(self, websocket: WebSocket, client_id: int) -> None:
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: int, chat_id: int) -> None:
        self.active_connections.pop(client_id)
        self.active_chats.pop(chat_id)

    async def send_msg_to_chat(self, message: str, chat_id: int):
        users_in_chat = self.active_chats[chat_id]
        for user in users_in_chat:
            connection = self.active_connections[user]
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/chat/{chat_id}/{user_id}")
async def websocket_endpoint(
        websocket: WebSocket,
        chat_id: int,
        user_id: int,
        # token: str,
):
    await manager.connect(websocket, client_id=user_id)
    # user_id = decode_jwt(token)["user_id"]
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_msg_to_chat(f"Client #{user_id} says: {data}", chat_id)
    except WebSocketDisconnect:
        manager.disconnect(client_id=user_id, chat_id=chat_id)


if __name__ == "__main__":
    uvicorn.run("chat:app", host="0.0.0.0", port=8000, reload=True)

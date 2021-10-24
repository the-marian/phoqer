import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from categories import categories
from chats import chats
from comments import comments
from config import NEXT_PUBLIC_HOST, database
from favorite import favorite
from locations import locations
from login import login
from notifications import notifications
from offers import offers
from upload import upload
from users import users

origins = ["http://localhost:4000", NEXT_PUBLIC_HOST]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(categories.router)
app.include_router(chats.router)
app.include_router(comments.router)
app.include_router(offers.router)
app.include_router(favorite.router)
app.include_router(login.router)
app.include_router(locations.router)
app.include_router(notifications.router)
app.include_router(users.router)
app.include_router(upload.router)


@app.on_event("startup")
async def startup() -> None:
    await database.connect()


@app.on_event("shutdown")
async def shutdown() -> None:
    await database.disconnect()

# sdfasdf
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

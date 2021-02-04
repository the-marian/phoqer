import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from FastAPI.comments import comments
from FastAPI.config import database
from FastAPI.offers import offers

origins = [
    "http://localhost:4000",
    "http://phoqer.com",
    "https://phoqer.com",
    "http://140.82.39.245",
    "https://140.82.39.245",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(comments.router)
app.include_router(offers.router)


@app.on_event("startup")
async def startup() -> None:
    await database.connect()


@app.on_event("shutdown")
async def shutdown() -> None:
    await database.disconnect()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from comments.comments import router
from comments.database import database

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
app.include_router(router)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

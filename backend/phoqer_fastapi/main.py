import uvicorn
from fastapi import FastAPI

from comments.comments import router
from comments.database import database

app = FastAPI()
app.include_router(router)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

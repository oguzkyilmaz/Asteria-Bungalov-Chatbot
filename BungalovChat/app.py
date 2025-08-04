from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import nest_asyncio
import uvicorn

from model_utils import generate_response

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_endpoint(request: PromptRequest):
    response = generate_response(request.prompt)
    return {"response": response}

# Colab'da çalıştırmak için

def run():
    nest_asyncio.apply()
    uvicorn.run(app, host="0.0.0.0", port=8000) 
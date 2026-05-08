from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.ai_service import analyze_phishing_text, chat_response
from services.scanner_service import analyze_url, scan_vulnerability

app = FastAPI(
    title="Aegis AI - Cybersecurity Assistant API",
    description="Backend API for the cybersecurity platform",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Aegis AI API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

class UrlScanRequest(BaseModel):
    url: str

class PhishingScanRequest(BaseModel):
    text: str

@app.post("/api/scan/url")
async def api_scan_url(request: UrlScanRequest):
    return analyze_url(request.url)

@app.post("/api/scan/phishing")
async def api_scan_phishing(request: PhishingScanRequest):
    return analyze_phishing_text(request.text)

class ChatRequest(BaseModel):
    message: str
    history: list = []

class ScannerRequest(BaseModel):
    target: str

@app.post("/api/chat")
async def api_chat_with_ai(request: ChatRequest):
    reply = chat_response(request.message, request.history)
    return {
        "role": "assistant",
        "content": reply
    }

@app.post("/api/scan/vulnerability")
async def api_scan_vulnerability(request: ScannerRequest):
    return scan_vulnerability(request.target)

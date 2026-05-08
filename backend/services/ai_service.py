import os
from langchain_groq import ChatGroq
from langchain.schema import SystemMessage, HumanMessage
import json

# Fetch API key (it won't crash immediately if missing until invoked)
api_key = os.getenv("GROQ_API_KEY", "mock-key")

llm = ChatGroq(
    model="llama3-8b-8192", # Defaulting to a fast groq model
    api_key=api_key,
    temperature=0.2
)

def analyze_phishing_text(text: str) -> dict:
    if api_key == "mock-key":
        return {
            "score": 88,
            "status": "High Risk Phishing",
            "confidence": 95,
            "threatCategory": "Social Engineering / Urgent Action",
            "aiSummary": "MOCK RESPONSE: The message uses classic urgency tactics...",
            "highlightedPhrases": ["account will be suspended within 24 hours", "click here immediately"]
        }

    system_prompt = """
    You are an expert cybersecurity analyst specializing in social engineering and phishing detection.
    Analyze the following email/message text. Determine if it is a phishing attempt.
    Respond ONLY with a raw JSON object containing the following keys:
    - score: Integer (0-100, where 100 is highly malicious)
    - status: String (e.g. "Safe", "Suspicious", "High Risk Phishing")
    - confidence: Integer (0-100 confidence in your assessment)
    - threatCategory: String (e.g. "Credential Harvesting", "Urgency Manipulation", "Safe")
    - aiSummary: String (1-2 sentences explaining why it's dangerous or safe)
    - highlightedPhrases: Array of strings (exact phrases from the text that are suspicious)
    """

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=f"Message to analyze: {text}")
    ]

    try:
        response = llm.invoke(messages)
        # Parse the JSON response
        result = json.loads(response.content)
        return result
    except Exception as e:
        return {
            "score": 50,
            "status": "Error analyzing text",
            "confidence": 0,
            "threatCategory": "Unknown",
            "aiSummary": f"Error calling AI: {str(e)}",
            "highlightedPhrases": []
        }

def chat_response(message: str, history: list) -> str:
    if api_key == "mock-key":
         return f"MOCK AI: Analyzing '{message}'. Please add a GROQ_API_KEY to your .env file."
    
    messages = [SystemMessage(content="You are Aegis Copilot, an expert cybersecurity AI assistant.")]
    for msg in history:
        # Assuming history format {"role": "user"/"assistant", "content": "..."}
        if msg.get("role") == "user":
            messages.append(HumanMessage(content=msg.get("content")))
        else:
            # For simplicity, using SystemMessage for assistant context in this basic setup
            messages.append(SystemMessage(content=msg.get("content")))
            
    messages.append(HumanMessage(content=message))
    
    try:
        response = llm.invoke(messages)
        return response.content
    except Exception as e:
        return f"Error connecting to AI: {str(e)}"

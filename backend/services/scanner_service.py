import whois
import httpx
from datetime import datetime

def analyze_url(url: str) -> dict:
    domain = url.replace("https://", "").replace("http://", "").split("/")[0]
    
    domain_age = "Unknown"
    ssl_valid = False
    
    try:
        # Check SSL and headers
        response = httpx.get(f"https://{domain}", timeout=5.0)
        ssl_valid = True # If httpx succeeds over https, SSL is valid
    except httpx.RequestError:
        ssl_valid = False

    try:
        w = whois.whois(domain)
        if w.creation_date:
            creation_date = w.creation_date
            if isinstance(creation_date, list):
                creation_date = creation_date[0]
            days_old = (datetime.now() - creation_date).days
            domain_age = f"{days_old} days"
    except Exception:
        pass

    return {
        "url": url,
        "trustScore": 75 if ssl_valid else 30,
        "safetyStatus": "Safe" if ssl_valid else "Suspicious",
        "sslValid": ssl_valid,
        "domainAge": domain_age,
        "maliciousKeywords": [],
        "aiSummary": f"Basic analysis complete. Domain Age: {domain_age}. SSL Valid: {ssl_valid}."
    }

def scan_vulnerability(target: str) -> dict:
    # A basic defensive scan looking for security headers
    url = target if target.startswith("http") else f"https://{target}"
    findings = []
    score = 100

    try:
        response = httpx.get(url, timeout=5.0)
        headers = response.headers

        if "Strict-Transport-Security" not in headers:
            findings.append({"type": "Missing Header", "severity": "Medium", "description": "Strict-Transport-Security header is missing."})
            score -= 15
        
        if "X-Frame-Options" not in headers:
            findings.append({"type": "Missing Header", "severity": "Medium", "description": "X-Frame-Options is not set. The site may be vulnerable to Clickjacking."})
            score -= 10
            
        if "Content-Security-Policy" not in headers:
            findings.append({"type": "Missing Header", "severity": "High", "description": "Content-Security-Policy is missing."})
            score -= 20
            
    except httpx.RequestError as e:
         findings.append({"type": "Connection Error", "severity": "High", "description": f"Failed to connect to target: {str(e)}"})
         score = 0

    return {
        "target": target,
        "score": max(0, score),
        "status": "Secure" if score > 80 else ("Moderate Risk" if score > 50 else "High Risk"),
        "findings": findings
    }

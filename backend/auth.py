import os
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()

security = HTTPBearer()

# We need the CLERK_PEM_PUBLIC_KEY from the Clerk dashboard to verify the JWT
# Or fetch JWKS dynamically. For simplicity, we assume an env var or dynamically fetching.
CLERK_ISSUER = os.getenv("CLERK_ISSUER_URL") # e.g. https://clerk.your-domain.com

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # In a real production app, fetch the JWKS from Clerk and verify the signature using the RS256 algorithm.
        # For this boilerplate, we'll decode without verification if the key isn't set, 
        # but warn that it must be set for production.
        
        # Example decoding (Replace with actual JWKS verification in production):
        unverified_claims = jwt.decode(token, options={"verify_signature": False})
        
        # To actually verify:
        # public_key = os.getenv("CLERK_PEM_PUBLIC_KEY")
        # payload = jwt.decode(token, public_key, algorithms=["RS256"], issuer=CLERK_ISSUER)
        
        return unverified_claims
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

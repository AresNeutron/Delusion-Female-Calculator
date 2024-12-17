from fastapi import FastAPI
from routers.data_api import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin(s)
    allow_credentials=True,
    allow_methods=["POST"],  # Allow all HTTP methods
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],  # Allow all headers
)

# Include the router
app.include_router(router)

import requests

# Define the FastAPI endpoint URL
url = "http://127.0.0.1:8000/calculate/"

# Prepare example input data to simulate a test user request
payload = {
    "age_min": 18,
    "age_max": 30,
    "race": "white",
    "min_height": 150.0,
    "salary_min": 50000.0
}

# Make the POST request to the FastAPI server
response = requests.post(url, json=payload)

# Check if the request was successful
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Failed to retrieve data: {response.status_code}")

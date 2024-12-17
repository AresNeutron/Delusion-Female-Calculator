from fastapi import APIRouter
from functions.physical_match import find_height_match, find_race_age_match
from functions.salary_match import find_salary_matches
from models.model import UserInput

router = APIRouter()

payload = {
    "age_min": 18,
    "age_max": 30,
    "race": "white",
    "min_height": 160.0,
    "salary_min": 2500.0
}

def find_final_match(payload: UserInput) -> float:
    age_min, age_max, race = payload.age_min, payload.age_max, payload.race
    min_height, salary_min = payload.min_height, payload.salary_min

    # Both cases fall to 100 percent if user sends None or ''
    percent_height_matched = find_height_match(min_height) if min_height else 100.00
    percent_salary_matched = find_salary_matches(salary_min) if salary_min else 100.00
    percent_race_age_matched = find_race_age_match(race, age_min, age_max)

    final_percent = (percent_height_matched * percent_salary_matched * percent_race_age_matched) / 10000
    if final_percent < 0.01:
        final_percent = 0.01
    return round(final_percent, 2)


@router.post("/calculate/")
async def fetch_data(user_data: UserInput):
    try:
        result = find_final_match(user_data)
        if result:
            return {"final_percent": result}

    except Exception as e:
        return {"error": str(e)}
    
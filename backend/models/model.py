from pydantic import BaseModel

class UserInput(BaseModel):
    age_min: int | None
    age_max: int | None
    race: str | None
    min_height: float | None
    salary_min: float | None

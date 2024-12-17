import { useState, FormEvent } from "react";
import { useFormContext } from "./Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faDollarSign,
  faGlobe,
  faRulerVertical,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function DelusionCalculatorForm() {
  const [error, setError] = useState<string>("");

  const {
    setResult,
    ageMax,
    setAgeMax,
    ageMin,
    setAgeMin,
    race,
    setRace,
    expectedSalary,
    setExpectedSalary,
    minHeight,
    setMinHeight,
  } = useFormContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/calculate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age_min: ageMin ? parseInt(ageMin) : null,
          age_max: ageMax ? parseInt(ageMax) : null,
          race: race ? race.toLowerCase() : null,
          salary_min: expectedSalary ? parseFloat(expectedSalary) : null,
          min_height: minHeight ? parseFloat(minHeight) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate");
      }

      const result = await response.json();
      // This need ajustment, the endpoint is not created yet
      setResult(result["final_percent"]);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <form
      className="space-y-12 mx-auto p-1 w-full max-w-[80%]"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="minHeight" className="labelHeader">
            First of all, enter the height you expect for your man. We all know
            that you women love tall men, don't you? 🤨.
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faRulerVertical}
              className="mr-5 text-white"
            />
            <input
              id="minHeight"
              name="minHeight"
              type="number"
              className="inputContainer"
              placeholder={
                minHeight === null ? "No Preference" : "Minimum Height (cm)"
              }
              value={minHeight === null ? "" : minHeight}
              onChange={(e) => setMinHeight(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between p-1">
            <p className="skipText">
              Or press this button if you don't mind the height of your man 😃.
            </p>
            <button
              type="button"
              className="myButton w-2/5"
              onClick={() => {
                setMinHeight(null); // Use null to represent "no preference"
              }}
            >
              Any
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="ageMax" className="labelHeader">
            Enter the maximum age (but not greater than 65)
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-4 text-white" />
            <input
              id="ageMax"
              name="ageMax"
              min="18"
              max="65"
              type="number"
              className="inputContainer"
              placeholder={ageMax === null ? "No Preference" : "Maximum Age"}
              value={ageMax === null ? "" : ageMax}
              onChange={(e) => {
                setAgeMax(e.target.value);
                if (ageMin && ageMax) {
                  if (parseInt(ageMin) > parseInt(ageMax)) {
                    setError(
                      "Minimum age must be less or equal to maximum age"
                    );
                    setAgeMin("");
                    setAgeMax("");
                  }
                }
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ageMin" className="labelHeader mt-10">
            And here the minimum age (18 or greater)
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-4 text-white" />
            <input
              id="ageMin"
              name="ageMin"
              min="18"
              max="65"
              type="number"
              className="inputContainer"
              placeholder={ageMin === null ? "No Preference" : "Minimum Age"}
              value={ageMin === null ? "" : ageMin}
              onChange={(e) => {
                setAgeMin(e.target.value);
                if (ageMin && ageMax) {
                  if (parseInt(ageMin) > parseInt(ageMax)) {
                    setError(
                      "Minimum age must be less or equal to maximum age"
                    );
                    setAgeMin("");
                    setAgeMax("");
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-1">
          <p className="skipText">
            Press this button if you don't mind about the age of your man
          </p>
          <button
            type="button" // Explicitly set this as a non-submit button
            className="myButton w-2/5"
            onClick={() => {
              setAgeMin(null);
              setAgeMax(null);
            }}
          >
            Any
          </button>
        </div>
        <div>
          <label htmlFor="race" className="labelHeader">
            Now choose the race (PD: Latinos are the best 😉)
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faGlobe} className="mr-3 text-white" />
            <select
              id="race"
              name="race"
              className="inputContainer"
              value={race === null ? "" : race}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setRace(selectedValue === "null" ? null : selectedValue); // Map "null" option to null
              }}
            >
              <option value="">
                {race === null ? "No Preference" : "Select Race"}
              </option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Asian">Asian</option>
              <option value="Hawaiian or Pacific Islander">
                Hawaiian or Pacific Islander
              </option>
              <option value="Indian or Alaska Native">
                Indian or Alaska Native
              </option>
              <option value="Other">Other</option>
              <option value="null">Any</option>
            </select>
          </div>
        </div>
        <div className="w-full h-10"></div>
        <div>
          <label htmlFor="expectedSalary" className="labelHeader">
            And last but not least, the expected anual salary
          </label>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faDollarSign} className="mr-4 text-white" />
            <input
              id="expectedSalary"
              name="expectedSalary"
              type="number"
              className="inputContainer"
              placeholder={
                expectedSalary === null ? "No Preference" : "Expected Salary"
              }
              value={expectedSalary === null ? "" : expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between p-1">
            <p className="skipText">Or again, if you don't mind the money</p>
            <button
              type="button" // Explicitly set this as a non-submit button
              className="myButton w-2/5"
              onClick={() => {
                setExpectedSalary(null);
              }}
            >
              Any
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center" role="alert">
          {error}
        </div>
      )}
      <div>
        <button type="submit" className="myButton">
          <FontAwesomeIcon icon={faCalculator} className="mr-2" />
          Calculate
        </button>
      </div>
    </form>
  );
}

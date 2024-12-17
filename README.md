# Female Delusion Calculator

## Description
The **Female Delusion Calculator** is a full-stack application designed to let users, primarily women, estimate the likelihood of finding a partner in the U.S. population who meets their specific criteria. Users input preferences such as:

- Minimum and maximum age
- Minimum height
- Race
- Salary range

This data is processed by the backend to calculate the percentage of the U.S. male population that matches the criteria, based on U.S. Census data. The frontend displays the calculated percentage alongside a "delusion range" to indicate how realistic the user's preferences are.

---

## Features

### Frontend
- **Frameworks and Tools:** React, TypeScript, Tailwind CSS
- **Form Input Fields:**
  - **Age Range:** Range input for selecting minimum and maximum ages (18-65).
  - **Race:** Dropdown menu with race options.
  - **Salary Range:** Numeric input for the expected salary (used to compute a range).
  - **Minimum Height:** Numeric input for height in feet or centimetres.
- Sends user input as a dictionary to the backend for processing.

### Backend
- **Frameworks and Tools:** Python, FastAPI, Pandas
- **Responsibilities:**
  1. Receives the input dictionary from the frontend.
  2. Fetches U.S. male population statistics (age, race, height, salary) using Census and related APIs.
  3. Filters the male population based on user-provided criteria (age range, race, height, salary range).
  4. Calculates the percentage of matching individuals relative to the total U.S. male population.
  5. Returns the percentage to the frontend.

---

## Data Sources
The backend utilizes the following datasets:

1. **Age Distribution (18-65):**
   - Source: U.S. Census Data API and American Community Survey (ACS)
   - Provides the age distribution of the U.S. population.

2. **Race:**
   - Source: U.S. Census API
   - Includes detailed race categories.

3. **Height and Weight:**
   - Source: CDC NHANES datasets and NCD-RisC data downloads
   - Includes statistical information on height distribution.

4. **Salary (Income):**
   - Source: U.S. Census Data API (ACS dataset)
   - Provides data on income distribution in the U.S.

---

## How It Works
1. **User Input:**
   - Users enter their criteria (age range, race, salary range, minimum height) in the frontend form.

2. **Data Processing:**
   - The backend fetches data from the respective sources.
   - Filters the male population based on the input criteria.
   - Calculates the percentage of matching individuals against the total U.S. male population.

3. **Results Display:**
   - The frontend shows the percentage of matching individuals.
   - A "delusion range" is displayed to indicate the rarity of the user's criteria:
     - **Low Delusion:** High percentage (e.g., >20%).
     - **Moderate Delusion:** Medium percentage (e.g., 5-20%).
     - **High Delusion:** Low percentage (e.g., <5%).

---

## Project Structure

### Frontend
- Built with **React, TypeScript, and Tailwind CSS**.
- Handles user inputs and displays the calculated results.
- Sends input data to the backend via API calls.

### Backend
- Built with **FastAPI** for high-performance, asynchronous processing.
- Utilizes **Pandas** for data filtering and analysis.
- Fetches data dynamically from external APIs (e.g., Census API).
- Calculates and returns the final percentage result to the frontend.

---

## Installation and Setup

### Prerequisites
- **Frontend:**
  - Node.js and npm/yarn installed.
- **Backend:**
  - Python 3.9+ installed.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/female-delusion-calculator.git
   cd female-delusion-calculator
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. **Run the Application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

---

## Future Improvements
- Add support for international data sources to expand beyond the U.S.
- Implement additional filters like education level or body weight.
- Enhance the "delusion range" with more detailed analytics or visualizations.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

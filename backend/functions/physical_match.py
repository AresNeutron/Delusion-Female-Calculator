import pandas as pd

csv_list = ['asian', 'black','hawaiian or pacific islander','indian or alaska native', 'white','other']
age_dict = {
        '18 and 19 years': [18, 19],
        '20 to 24 years': [20, 21, 22, 23, 24],
        '25 to 29 years': [25, 26, 27, 28, 29],
        '30 to 34 years': [30, 31, 32, 33, 34],
        '35 to 44 years': [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
        '45 to 54 years': [45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
        '55 to 64 years': [55, 56, 57, 58, 59, 60, 61, 62, 63, 64]
    }

def find_race_age_match(race: str | None, age_min: int | None, age_max: int | None):
    if not race and not age_min:
        return 100.00  # All men match
    else:
        matched_men = 0
        if not race and age_min:
            for csv in csv_list:
                df = pd.read_csv(f'data/{csv}.csv')[2:9]

                for age_str, age_range in age_dict.items():
                    if any(age in range(age_min, age_max + 1) for age in age_range):
                        row = df.loc[df["Label (Grouping)"] == age_str]
                        matched_men += int(row["United States!!Estimate"].values[0].replace(',', ''))

        elif race:
            race_df = pd.read_csv(f'data/{race}.csv')
            race_df["Label (Grouping)"] = race_df["Label (Grouping)"].str.strip()

            if not age_min:
                row = race_df.loc[race_df['Label (Grouping)'] == 'Male:']
                matched_men = int(row['United States!!Estimate'].values[0].replace(',',''))
            else:
                for age_str, age_range in age_dict.items():
                    if any(age in range(age_min, age_max + 1) for age in age_range):
                        row = race_df.loc[race_df["Label (Grouping)"] == age_str]
                        matched_men += int(row["United States!!Estimate"].values[0].replace(',', ''))

        return percent_match(matched_men)


def find_height_match(min_height: float) -> float:
    hw_df = pd.read_csv('data/height.csv')

    mask = (hw_df['height'] >= min_height)
    match_df = hw_df[mask]

    total_men = len(hw_df)
    matched_men = len(match_df)
    match_percentage = (matched_men / total_men) * 100

    return round(match_percentage, 2)


def percent_match(matched_men: int):
    total_sum = 0

    for csv in csv_list:
        df = pd.read_csv(f'data/{csv}.csv')
        male_number = df[df["Label (Grouping)"] == "Male:"]["United States!!Estimate"].values[0]
        total_sum += int(male_number.replace(',', ''))

    percent = (matched_men / total_sum) * 100
    return round(percent, 2)

# payload = {
#     "age_min": 18,
#     "age_max": 30,
#     "race": "white",
#     "min_height": 180.0,
#     "salary_min": 50000.0,
# }

# print(find_race_age_match(payload["race"], payload["age_min"], payload['age_max']))
# print(find_height_match(payload['min_height']))    
# print(percent_match(10000000))

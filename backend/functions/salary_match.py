import pandas as pd
from functions.physical_match import percent_match

def is_above_salary(salary: float, salary_range: str):
    salary_list_words = salary_range.split()
    try:
        lower_bound = float(salary_list_words[0][1:].replace(',', ''))  # Strip '$' and commas
        upper_bound = float(salary_list_words[2][1:].replace(',', ''))  # Strip '$' and commas
        if lower_bound >= salary or upper_bound >= salary:
            return True
    except ValueError:
        if 'more' in salary_range:
            return True

    return False

def find_salary_matches(salary: float):
    df = pd.read_csv('data/salary_by_gender.csv')
    df["Label (Grouping)"] = df["Label (Grouping)"].str.strip()  # Remove extra spaces

    upper_df = df[5:25]
    lower_df = df[28:48]
    new_df = pd.concat([upper_df, lower_df], axis=0)  # Concatenate by rows, vertically

    ranges_list = new_df['Label (Grouping)'].values
    population_list = new_df["United States!!Estimate"].values

    # Filter the salaries to keep only those equal or greater than expected
    clean_salary_list = [population_list[index] for index, salary_rg in enumerate(ranges_list) if is_above_salary(salary, salary_rg)]

    matched_men = 0
    for value in clean_salary_list:
        matched_men += int(value.replace(',','')) 

    return percent_match(matched_men)
 
# Test the function
# input_salary = 52000
# print(find_salary_matches(input_salary))  # Output: "$50,000 to $54,999"


import pandas as pd
import joblib
import sys
import json

# Define the path to your models
save_path = r"C:\Users\Younus\Desktop\Research\Tourist_budget_management_system\back_end\ML"

# Load the machine learning models
model_accommodation = joblib.load(save_path + r'\model_accommodation.pkl')
model_transportation = joblib.load(save_path + r'\model_transportation.pkl')
model_food = joblib.load(save_path + r'\model_food.pkl')
model_activities = joblib.load(save_path + r'\model_activities.pkl')
model_others = joblib.load(save_path + r'\model_others.pkl')


mid_range_multiplier = 1.5
high_end_multiplier = 4.5

def predict(budget, destination, number_of_days, visitor_count):
    try:
        budget = float(budget)
        number_of_days = int(number_of_days)
        visitor_count = int(visitor_count)

        # Prepare user data for model prediction
        user_data = {
            'Duration (days)': number_of_days,
            'Traveler age': 30  # Assuming a default age; adjust as needed
        }

        # Set up destination columns for the models
        destination_columns = [col for col in model_accommodation.feature_names_in_ if 'Destination' in col]
        for col in destination_columns:
            user_data[col] = 1 if col == f'Destination_{destination}' else 0

        # Convert user data to DataFrame and ensure it has all required columns
        user_df = pd.DataFrame([user_data])
        missing_cols = set(model_accommodation.feature_names_in_) - set(user_df.columns)
        for col in missing_cols:
            user_df[col] = 0

        # Calculate Budget-Friendly costs
        costs = {
            "Budget_Friendly": {
                "accommodation_cost_per_person": round(model_accommodation.predict(user_df)[0] / visitor_count, 2),
                "transportation_cost_per_person": round(model_transportation.predict(user_df)[0] / visitor_count, 2),
                "food_cost_per_person": round(model_food.predict(user_df)[0] / visitor_count, 2),
                "activities_cost_per_person": round(model_activities.predict(user_df)[0] / visitor_count, 2),
                "others_cost_per_person": round(model_others.predict(user_df)[0] / visitor_count, 2),
            }
        }
        
        # Calculate total cost for Budget-Friendly plan
        costs["Budget_Friendly"]["total_cost"] = round(
            sum(costs["Budget_Friendly"].values()) * visitor_count, 2
        )

        # Check if total cost exceeds the budget
        if costs["Budget_Friendly"]["total_cost"] > budget:
            print(json.dumps({
                "status": "error",
                "message": "The predicted costs exceed your budget. Please adjust your budget or explore alternative options."
            }))
            sys.exit(1)

        # Calculate Mid-Range and High-End costs
        for plan, multiplier in [("Mid_Range", mid_range_multiplier), ("High_End", high_end_multiplier)]:
            costs[plan] = {k: round(v * multiplier, 2) for k, v in costs["Budget_Friendly"].items()}
            costs[plan]["total_cost"] = round(costs[plan]["total_cost"] * visitor_count, 2)

        # Filter plans by budget
        costs = {k: v for k, v in costs.items() if v["total_cost"] <= budget}

        # Output the JSON response
        print(json.dumps(costs))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)


if __name__ == '__main__':
    predict(*sys.argv[1:])

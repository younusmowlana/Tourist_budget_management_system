from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

save_path = r"C:\Users\Younus\Desktop\Research\Tourist_budget_management_system\back_end\ML"  


# Load the models from the saved .pkl files
model_accommodation = joblib.load(save_path + r'\model_accommodation.pkl')
model_transportation = joblib.load(save_path + r'\model_transportation.pkl')
model_food = joblib.load(save_path + r'\model_food.pkl')
model_activities = joblib.load(save_path + r'\model_activities.pkl')
model_others = joblib.load(save_path + r'\model_others.pkl')


mid_range_multiplier = 1.5
high_end_multiplier = 4.5

@app.route('/', methods=['POST'])
def predict():
    data = request.json
    budget = data.get('budget')
    destination = data.get('destination')
    number_of_days = data.get('number_of_days')
    visitor_count = data.get('visitor_count')

    # Feature engineering: Convert input into a feature vector
    user_data = {
        'Duration (days)': number_of_days,
        'Traveler age': 30  
    }

    # One-hot encode the destination based on the training data
    destination_columns = [col for col in model_accommodation.feature_names_in_ if 'Destination' in col]
    for col in destination_columns:
        user_data[col] = 1 if col == f'Destination_{destination}' else 0

    # Convert to DataFrame
    user_df = pd.DataFrame([user_data])

    # Ensure the user_df has all the required columns
    missing_cols = set(model_accommodation.feature_names_in_) - set(user_df.columns)
    for col in missing_cols:
        user_df[col] = 0  # Add missing columns with 0 value if not present in input

    # Predict costs for the Budget Friendly plan
    accommodation_cost_per_person = round(model_accommodation.predict(user_df)[0] / visitor_count, 2)
    transportation_cost_per_person = round(model_transportation.predict(user_df)[0] / visitor_count, 2)
    food_cost_per_person = round(model_food.predict(user_df)[0] / visitor_count, 2)
    activities_cost_per_person = round(model_activities.predict(user_df)[0] / visitor_count, 2)
    others_cost_per_person = round(model_others.predict(user_df)[0] / visitor_count, 2)

    total_cost_per_person = round(accommodation_cost_per_person + transportation_cost_per_person +
                                  food_cost_per_person + activities_cost_per_person + others_cost_per_person, 2)

    total_cost = round(total_cost_per_person * visitor_count, 2)

    if total_cost > budget:
        return jsonify({
            "status": "error",
            "message": "The predicted costs exceed your budget. Please adjust your budget or explore alternative options."
        }), 400

    # Prepare response for Budget Friendly plan
    response = {
        "Budget_Friendly": {
            "accommodation_cost_per_person": accommodation_cost_per_person,
            "transportation_cost_per_person": transportation_cost_per_person,
            "food_cost_per_person": food_cost_per_person,
            "activities_cost_per_person": activities_cost_per_person,
            "others_cost_per_person": others_cost_per_person,
            "total_cost": total_cost
        }
    }

    # Calculate costs for Mid-Range plan
    accommodation_cost_per_person_mid = round(accommodation_cost_per_person * mid_range_multiplier, 2)
    transportation_cost_per_person_mid = round(transportation_cost_per_person * mid_range_multiplier, 2)
    food_cost_per_person_mid = round(food_cost_per_person * mid_range_multiplier, 2)
    activities_cost_per_person_mid = round(activities_cost_per_person * mid_range_multiplier, 2)
    others_cost_per_person_mid = round(others_cost_per_person * mid_range_multiplier, 2)

    total_cost_per_person_mid = round(accommodation_cost_per_person_mid + transportation_cost_per_person_mid +
                                      food_cost_per_person_mid + activities_cost_per_person_mid + others_cost_per_person_mid, 2)

    total_cost_mid = round(total_cost_per_person_mid * visitor_count, 2)

    # Calculate costs for High-End plan
    accommodation_cost_per_person_high = round(accommodation_cost_per_person * high_end_multiplier, 2)
    transportation_cost_per_person_high = round(transportation_cost_per_person * high_end_multiplier, 2)
    food_cost_per_person_high = round(food_cost_per_person * high_end_multiplier, 2)
    activities_cost_per_person_high = round(activities_cost_per_person * high_end_multiplier, 2)
    others_cost_per_person_high = round(others_cost_per_person * high_end_multiplier, 2)

    total_cost_per_person_high = round(accommodation_cost_per_person_high + transportation_cost_per_person_high +
                                       food_cost_per_person_high + activities_cost_per_person_high + others_cost_per_person_high, 2)

    total_cost_high = round(total_cost_per_person_high * visitor_count, 2)

    # Determine which plans to include based on budget
    if total_cost_mid <= budget:
        response["Mid_Range"] = {
            "accommodation_cost_per_person": accommodation_cost_per_person_mid,
            "transportation_cost_per_person": transportation_cost_per_person_mid,
            "food_cost_per_person": food_cost_per_person_mid,
            "activities_cost_per_person": activities_cost_per_person_mid,
            "others_cost_per_person": others_cost_per_person_mid,
            "total_cost": total_cost_mid
        }

    if total_cost_high <= budget:
        response["High_End"] = {
            "accommodation_cost_per_person": accommodation_cost_per_person_high,
            "transportation_cost_per_person": transportation_cost_per_person_high,
            "food_cost_per_person": food_cost_per_person_high,
            "activities_cost_per_person": activities_cost_per_person_high,
            "others_cost_per_person": others_cost_per_person_high,
            "total_cost": total_cost_high
        }

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
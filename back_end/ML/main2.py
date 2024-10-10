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

@app.route('/', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.json
    budget = data.get('budget')
    destination = data.get('destination')
    number_of_days = data.get('number_of_days')
    visitor_count = data.get('visitor_count')

    # Feature engineering: Convert input into a feature vector
    user_data = {
        'Duration (days)': number_of_days,
        'Traveler age': 30  # Assume an average age for now, or add it to the input
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

    # Make predictions for each cost type (per person)
    accommodation_cost_per_person = model_accommodation.predict(user_df)[0] / visitor_count
    transportation_cost_per_person = model_transportation.predict(user_df)[0] / visitor_count
    food_cost_per_person = model_food.predict(user_df)[0] / visitor_count
    activities_cost_per_person = model_activities.predict(user_df)[0] / visitor_count
    others_cost_per_person = model_others.predict(user_df)[0] / visitor_count

    # Calculate total predicted cost per person
    total_cost_per_person = (accommodation_cost_per_person + transportation_cost_per_person +
                             food_cost_per_person + activities_cost_per_person + others_cost_per_person)

    # Calculate total cost for all visitors
    total_cost = total_cost_per_person * visitor_count

    # Ensure it doesn't exceed the budget
    if total_cost > budget:
        return jsonify({
            "status": "error",
            "message": "Predicted costs exceed the budget"
        }), 400

    # Return the predicted costs per person and total cost for all visitors
    return jsonify({
        "accommodation_cost_per_person": accommodation_cost_per_person,
        "transportation_cost_per_person": transportation_cost_per_person,
        "food_cost_per_person": food_cost_per_person,
        "activities_cost_per_person": activities_cost_per_person,
        "others_cost_per_person": others_cost_per_person,
        "total_cost": total_cost
    }), 200

if __name__ == '__main__':
    app.run(debug=True)

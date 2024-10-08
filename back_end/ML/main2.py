from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def predict():
    # try:
        # Getting the arguments passed in the POST request
        data = request.json
        budget = data.get('budget')
        destination = data.get('destination')
        number_of_days = data.get('number_of_days')
        visitor_count = data.get('visitor_count')

        # Print the values (as required)
        print(f"Budget: {budget}")
        print(f"Destination: {destination}")
        print(f"Number of Days: {number_of_days}")
        print(f"Visitor Count: {visitor_count}")

    #     # Return a success response
    #     return jsonify({
    #         "status": "success",
    #         "message": "Data received successfully!",
    #         "data": {
    #             "budget": budget,
    #             "destination": destination,
    #             "number_of_days": number_of_days,
    #             "visitor_count": visitor_count
    #         }
    #     }), 200

    # except Exception as e:
    #     return jsonify({
    #         "status": "error",
    #         "message": str(e)
    #     }), 500

if __name__ == '__main__':
    app.run(debug=True)

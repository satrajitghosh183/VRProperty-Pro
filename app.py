import pickle
from flask import Flask, jsonify, request
import pandas as pd
from werkzeug.utils import secure_filename
app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))
@app.route('/predict', methods=['POST'])


@app.route('/predict', methods=['POST'])
def predict():
    file = request.files[r'D:\Housing Prices Prediction\random_housing_dataset.csv']  # Get the uploaded file
    filename = secure_filename(file.filename)  # Secure the filename
    file.save(filename)  # Save the file to the server

    # Read the test data from the CSV file
    test_data = pd.read_csv(filename)

    # Extract the features from the test data
    X_test = test_data[['City', 'Area']]

    # Perform prediction using the loaded model
    predicted_prices = model.predict(X_test)

    # Create a dictionary with the ID and predicted price
    results = {}
    for id, price in zip(test_data['ID'], predicted_prices):
        results[id] = price

    # Return the JSON response with the predicted prices
    return jsonify(results)

if __name__ == '__main__':
    app.run()

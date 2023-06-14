import pickle
from flask import Flask, jsonify, request
import pandas as pd
from flask_restful import Api, Resource, reqparse
from werkzeug.utils import secure_filename
from google.cloud import storage
import os

app = Flask(__name__)
api = Api(app)

# Initialize Google Cloud Storage client
storage_client = storage.Client()

# Define the name of your bucket and files
bucket_name = 'vr-property-pro'
model_file_name = 'model.pkl'
dataset_file_name = 'random_housing_dataset.csv'

# Load the model from the downloaded file
def load_model():
    model_blob = storage_client.get_bucket(bucket_name).blob(model_file_name)
    model_blob.download_to_filename(model_file_name)
    model = pickle.load(open(model_file_name, 'rb'))
    return model

class Predict(Resource):
    def __init__(self):
        self.model = load_model()

    def post(self):
        file = request.files['file']  # Assuming you're sending the dataset file in the request

        # Save the file to the server
        filename = secure_filename(file.filename)
        file.save(filename)

        # Upload the dataset file to Google Cloud Storage
        dataset_bucket = storage_client.get_bucket(bucket_name)
        dataset_blob = dataset_bucket.blob(dataset_file_name)
        dataset_blob.upload_from_filename(filename)

        # Read the test data from the CSV file
        dataset_file_uri = f"gs://{bucket_name}/{dataset_file_name}"
        test_data = pd.read_csv(dataset_file_uri)

        # Extract the features from the test data
        X_test = test_data[['City', 'Area']]

        # Perform prediction using the loaded model
        predicted_prices = self.model.predict(X_test)

        # Create a dictionary with the ID and predicted price
        results = {}
        for id, price in zip(test_data['ID'], predicted_prices):
            results[id] = price

        # Return the JSON response with the predicted prices
        return jsonify(results)

api.add_resource(Predict, '/predict')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
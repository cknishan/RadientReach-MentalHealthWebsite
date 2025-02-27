import json
import firebase_admin # type: ignore
from firebase_admin import credentials, firestore # type: ignore
from dotenv import load_dotenv # type: ignore
import os

service_account_json = "replace with real cred"

# Initialize Firebase Admin if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(service_account_json)
    firebase_admin.initialize_app(cred)

def upload_json_to_firestore(json_file, collection_name='default_collection'):
    db = firestore.client()

    with open(json_file, 'r') as file:
        data = json.load(file)

    collection_ref = db.collection(collection_name)

    if isinstance(data, dict):
        # Case where JSON is a dictionary with document IDs as keys
        for doc_id, doc_data in data.items():
            collection_ref.document(doc_id).set(doc_data)
    elif isinstance(data, list):
        # Case where JSON is a list of documents (each document should have an 'id' field)
        for doc in data:
            doc_id = doc.get('id')
            if doc_id is None:
                raise ValueError("Each document in the JSON list must have an 'id' field.")
            doc_data = {k: v for k, v in doc.items() if k != 'id'}  # Remove 'id' from doc data
            collection_ref.document(doc_id).set(doc_data)
    else:
        raise ValueError("JSON data must be a dictionary or a list of documents.")

    print(f'Uploaded data to Firestore collection "{collection_name}".')
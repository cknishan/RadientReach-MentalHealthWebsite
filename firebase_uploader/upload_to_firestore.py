import json
import firebase_admin  # type: ignore
from firebase_admin import credentials, firestore  # type: ignore



# Load service account credentials from environment variable or file
service_account_json = {
}


if not service_account_json:
    raise ValueError("FIREBASE_SERVICE_ACCOUNT_JSON environment variable not set.")

# Parse the service account JSON string
service_account_info = service_account_json

# Initialize Firebase Admin SDK if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(cred)

# Initialize Firestore DB client
db = firestore.client()

def upload_data_to_firestore(json_file):
    """
    Uploads data from a JSON file to Firestore collections.
    
    Args:
        json_file (str): Path to the JSON file containing the data.
    """
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Upload each section to its respective collection
    upload_collection(data.get("centers", []), "centers")
    upload_collection(data.get("events", []), "events")
    upload_collection(data.get("topics", []), "articles")

    print("Data uploaded successfully.")

def upload_collection(items, collection_name):
    """
    Uploads a list of items to a Firestore collection.
    
    Args:
        items (list): List of dictionaries representing the documents to upload.
        collection_name (str): Name of the Firestore collection.
    """
    if not isinstance(items, list):
        raise ValueError("Expected a list of documents.")

    # Use the globally defined `db` variable
    collection_ref = db.collection(collection_name)
    for item in items:
        if not isinstance(item, dict):
            raise ValueError("Each document must be a dictionary.")
        
        # Extract the document ID if it exists
        doc_id = item.get('id')
        if doc_id:
            # Remove 'id' from document data, Firestore doesn't need it in the document itself
            doc_data = {k: v for k, v in item.items() if k != 'id'}
            collection_ref.document(doc_id).set(doc_data)
        else:
            # Auto-generate Firestore document ID if 'id' is not provided
            collection_ref.document().set(item)

    print(f"Uploaded {len(items)} documents to '{collection_name}' collection.")

# Example usage
if __name__ == "__main__":
    json_file = "data/firebaseData.json"  # Replace with your JSON file path
    upload_data_to_firestore(json_file)
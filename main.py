from firebase_uploader.upload_to_firestore import upload_data_to_firestore


def main():
    upload_data_to_firestore('data/firebaseData.json')

if __name__ == '__main__':
    main()

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const sgMail = require('@sendgrid/mail');

// const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp();
}


const emailKey = functions.config().sendgrid.key;
sgMail.setApiKey(emailKey);


// HTTP Cloud Function for CORS
exports.sendBookingEmailHTTP = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        // Check if the method is POST
        if (req.method !== 'POST') {
            return res.status(405).send('Method Not Allowed');
        }

        const { to, eventName, eventDate, eventPlace } = req.body;

        const msg = {
            to: to,
            from: 'nishan.chakma.nish@gmail.com',
            subject: `Booking Confirmation: ${eventName}`,
            text: `Thank you for booking ${eventName}.\n\nDetails:\nEvent Name: ${eventName}\nDate: ${eventDate}\nPlace: ${eventPlace}`,
            html: `<p>Thank you for booking <strong>${eventName}</strong>.</p>
                   <p>Event Date: ${eventDate}</p>
                   <p>Event Place: ${eventPlace}</p>`
        };

        try {
            await sgMail.send(msg);
            return res.status(200).send({ success: true });
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).send({ success: false, error: error.toString() });
        }
    });
});

exports.getTopics = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const topicsCollection = admin.firestore().collection("topics");
            const snapshot = await topicsCollection.get();

            const topics = [];
            snapshot.forEach((doc) => {
                topics.push({ id: doc.id, ...doc.data() });
            });

            res.status(200).json(topics);
        } catch (error) {
            console.error("Error fetching topics:", error.message);
            res.status(500).send("Error fetching topics");
        }
    });
});

exports.getMentalHealthCenters = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const centersCollection = admin.firestore().collection('mentalHealthCenters');
            const snapshot = await centersCollection.get();

            const centers = [];
            snapshot.forEach(doc => {
                centers.push({ id: doc.id, ...doc.data() });
            });

            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).json(centers);
        } catch (error) {
            console.error('Error fetching mental health centers:', error.message);
            res.status(500).send('Error fetching mental health centers');
        }
    });
});
import { config, https } from 'firebase-functions';
import { apps, initializeApp, firestore } from 'firebase-admin';
// eslint-disable-next-line no-undef
const cors = require('cors')({ origin: true });
import { setApiKey, send } from '@sendgrid/mail';

// const admin = require("firebase-admin");

if (!apps.length) {
    initializeApp();
}


const emailKey = config().sendgrid.key;
setApiKey(emailKey);


export const sendBookingEmailHTTP = https.onRequest((req, res) => {
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
            await send(msg);
            return res.status(200).send({ success: true });
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).send({ success: false, error: error.toString() });
        }
    });
});

export const getTopics = https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const topicsCollection = firestore().collection("topics");
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

export const getMentalHealthCenters = https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const centersCollection = firestore().collection('mentalHealthCenters');
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
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

const emailKey = functions.config().sendgrid.key;
sgMail.setApiKey(emailKey);

// Firestore trigger on document creation in the "bookings" collection
exports.sendBookingEmail = functions.firestore.document('bookings/{bookingId}').onCreate(async (snap, context) => {
    const bookingData = snap.data(); // Get the newly created booking document data

    const { email: to, eventName, eventDate, eventPlace } = bookingData;

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
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
});

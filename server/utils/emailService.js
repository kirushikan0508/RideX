const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail or SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

const sendBookingConfirmation = async (user, booking, vehicle) => {
    const subject = `RideX Booking Confirmation - ${booking._id.toString().slice(-6).toUpperCase()}`;
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #007bff;">Booking Confirmed!</h2>
            <p>Hi ${user.name},</p>
            <p>Your booking for <strong>${vehicle.name}</strong> has been successfully confirmed.</p>
            
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Booking ID:</strong> ${booking._id.toString().slice(-6).toUpperCase()}</p>
                <p><strong>Pickup:</strong> ${new Date(booking.pickupDate).toLocaleDateString()}</p>
                <p><strong>Return:</strong> ${new Date(booking.returnDate).toLocaleDateString()}</p>
                <p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
            </div>

            <p>You can view your booking details in your dashboard.</p>
            <a href="http://localhost:5173/dashboard" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        </div>
    `;
    await sendEmail(user.email, subject, html);
};

const sendBookingCancellation = async (user, booking, vehicle) => {
    const subject = `RideX Booking Cancelled - ${booking._id.toString().slice(-6).toUpperCase()}`;
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #dc3545;">Booking Cancelled</h2>
            <p>Hi ${user.name},</p>
            <p>Your booking for <strong>${vehicle.name}</strong> has been cancelled.</p>
            <p>If you have any questions, please contact support.</p>
        </div>
    `;
    await sendEmail(user.email, subject, html);
};

const sendOwnerNewBookingAlert = async (owner, booking, vehicle) => {
    const subject = `New Booking Request - ${vehicle.name}`;
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #28a745;">New Booking Received!</h2>
            <p>Hi ${owner.name},</p>
            <p>You have received a new booking request for <strong>${vehicle.name}</strong>.</p>
            
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Dates:</strong> ${new Date(booking.pickupDate).toLocaleDateString()} to ${new Date(booking.returnDate).toLocaleDateString()}</p>
                <p><strong>Earnings:</strong> ₹${booking.totalPrice}</p>
            </div>

            <p>Please log in to your dashboard to approve or reject this request.</p>
        </div>
    `;
    await sendEmail(owner.email, subject, html);
};

// Placeholder for SMS
const sendSMS = async (to, message) => {
    console.log(`[SMS MOCK] To: ${to}, Message: ${message}`);
    // Twilio implementation would go here
};

module.exports = {
    sendBookingConfirmation,
    sendBookingCancellation,
    sendOwnerNewBookingAlert,
    sendSMS
};

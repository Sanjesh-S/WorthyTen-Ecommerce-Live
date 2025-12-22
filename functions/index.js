const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Telegram Config
const BOT_TOKEN = functions.config().telegram?.token;
const CHAT_ID = functions.config().telegram?.chat_id;

// Twilio WhatsApp Config
const TWILIO_SID = functions.config().twilio?.sid;
const TWILIO_AUTH = functions.config().twilio?.auth_token;
const TWILIO_WHATSAPP = functions.config().twilio?.whatsapp_number;
const ADMIN_WHATSAPP = functions.config().whatsapp?.admin_phone;

// Email Config (Hostinger SMTP)
const EMAIL_HOST = functions.config().email?.host || "smtp.hostinger.com";
const EMAIL_PORT = functions.config().email?.port || 465;
const EMAIL_USER = functions.config().email?.user;
const EMAIL_PASS = functions.config().email?.password;
const EMAIL_FROM = functions.config().email?.from || "noreply@worthyten.com";

// Initialize Twilio client
let twilioClient = null;
if (TWILIO_SID && TWILIO_AUTH) {
  twilioClient = twilio(TWILIO_SID, TWILIO_AUTH);
}

// Initialize Nodemailer transporter
let emailTransporter = null;
if (EMAIL_USER && EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true, // Use SSL
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

/**
 * Format currency for display
 */
function formatPrice(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

/**
 * Send WhatsApp message using Twilio
 */
async function sendWhatsAppMessage(to, message) {
  if (!twilioClient || !TWILIO_WHATSAPP) {
    console.log("Twilio not configured, skipping WhatsApp message");
    return null;
  }

  try {
    const formattedTo = to.startsWith("+") ? to : `+${to}`;
    const result = await twilioClient.messages.create({
      from: TWILIO_WHATSAPP,
      to: `whatsapp:${formattedTo}`,
      body: message,
    });
    console.log("WhatsApp message sent:", result.sid);
    return result;
  } catch (error) {
    console.error("WhatsApp send error:", error.message);
    return null;
  }
}

/**
 * Send Telegram notification
 */
async function sendTelegramNotification(message) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log("Telegram not configured, skipping");
    return null;
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }
    );
    console.log("Telegram notification sent!");
    return response.data;
  } catch (error) {
    console.error("Telegram error:", error.message);
    return null;
  }
}

/**
 * Send Email using Nodemailer
 */
async function sendEmail(to, subject, htmlContent) {
  if (!emailTransporter || !to) {
    console.log("Email not configured or no recipient, skipping");
    return null;
  }

  try {
    const result = await emailTransporter.sendMail({
      from: `"WorthyTen" <${EMAIL_FROM}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("Email send error:", error.message);
    return null;
  }
}

/**
 * Generate Pickup Confirmation Email HTML
 */
function generatePickupConfirmationEmail(request) {
  const customer = request.customer || {};
  const device = request.device || {};
  const schedule = request.schedule || {};
  const price = request.finalPrice || 0;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pickup Confirmed - WorthyTen</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">WorthyTen</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Sell Your Device Instantly</p>
    </div>
    
    <!-- Success Icon -->
    <div style="text-align: center; padding: 30px 20px 10px;">
      <div style="width: 70px; height: 70px; background-color: #4CAF50; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-size: 35px;">✓</span>
      </div>
      <h2 style="color: #333; margin: 20px 0 10px;">Pickup Confirmed!</h2>
      <p style="color: #666; margin: 0;">Your device pickup has been scheduled</p>
    </div>
    
    <!-- Customer Greeting -->
    <div style="padding: 0 30px;">
      <p style="color: #333; font-size: 16px;">Hi <strong>${customer.name || "there"}</strong>,</p>
      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        Thank you for choosing WorthyTen! We've received your pickup request and our team is ready to collect your device.
      </p>
    </div>
    
    <!-- Device Details Card -->
    <div style="margin: 20px 30px; background-color: #f8f9fa; border-radius: 12px; overflow: hidden; border: 1px solid #e9ecef;">
      <div style="background-color: #667eea; padding: 15px 20px;">
        <h3 style="color: #fff; margin: 0; font-size: 16px;">📱 Device Details</h3>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Device</td>
            <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${device.brandName || ""} ${device.modelName || ""}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Quoted Price</td>
            <td style="padding: 8px 0; color: #4CAF50; font-size: 18px; font-weight: 700; text-align: right;">${formatPrice(price)}</td>
          </tr>
        </table>
      </div>
    </div>
    
    <!-- Pickup Schedule Card -->
    <div style="margin: 20px 30px; background-color: #fff3e0; border-radius: 12px; overflow: hidden; border: 1px solid #ffe0b2;">
      <div style="background-color: #ff9800; padding: 15px 20px;">
        <h3 style="color: #fff; margin: 0; font-size: 16px;">📅 Pickup Schedule</h3>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Date</td>
            <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${schedule.dateLabel || "To be confirmed"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">Time</td>
            <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600; text-align: right;">${schedule.slot || "To be confirmed"}</td>
          </tr>
        </table>
      </div>
    </div>
    
    <!-- Address Card -->
    <div style="margin: 20px 30px; background-color: #e3f2fd; border-radius: 12px; padding: 20px; border: 1px solid #bbdefb;">
      <h3 style="color: #1976d2; margin: 0 0 10px; font-size: 14px;">📍 Pickup Address</h3>
      <p style="color: #333; margin: 0; font-size: 14px; line-height: 1.5;">
        ${customer.address || ""}${customer.landmark ? `, Near: ${customer.landmark}` : ""}<br>
        ${customer.city || ""}, ${customer.state || "Tamil Nadu"} - ${customer.pincode || ""}
      </p>
    </div>
    
    <!-- What's Next -->
    <div style="margin: 30px 30px; padding: 20px; background-color: #f5f5f5; border-radius: 12px;">
      <h3 style="color: #333; margin: 0 0 15px; font-size: 16px;">What happens next?</h3>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 24px; height: 24px; background-color: #667eea; border-radius: 50%; color: white; font-size: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">1</div>
        <div style="color: #666; font-size: 14px;">Our agent will contact you to confirm the pickup time</div>
      </div>
      <div style="display: flex; margin-bottom: 12px;">
        <div style="width: 24px; height: 24px; background-color: #667eea; border-radius: 50%; color: white; font-size: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">2</div>
        <div style="color: #666; font-size: 14px;">Device will be inspected at pickup</div>
      </div>
      <div style="display: flex;">
        <div style="width: 24px; height: 24px; background-color: #667eea; border-radius: 50%; color: white; font-size: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">3</div>
        <div style="color: #666; font-size: 14px;">Payment within 24 hours of pickup</div>
      </div>
    </div>
    
    <!-- Contact Section -->
    <div style="text-align: center; padding: 20px 30px;">
      <p style="color: #666; font-size: 14px; margin: 0 0 15px;">Questions? We're here to help!</p>
      <a href="tel:+919843010746" style="display: inline-block; background-color: #25D366; color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-size: 14px; font-weight: 600;">
        📞 Call Us: 9843010746
      </a>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #333; padding: 25px 30px; text-align: center;">
      <p style="color: #fff; margin: 0 0 10px; font-size: 16px; font-weight: 600;">WorthyTen</p>
      <p style="color: #999; margin: 0 0 15px; font-size: 12px;">Sell Your Device Instantly | Get Best Price</p>
      <p style="color: #666; margin: 0; font-size: 11px;">
        Avinashi Rd, Peelamedu, Coimbatore, Tamil Nadu 641004
      </p>
      <div style="margin-top: 15px;">
        <a href="https://worthyten.com" style="color: #667eea; font-size: 12px; text-decoration: none;">worthyten.com</a>
      </div>
    </div>
    
  </div>
</body>
</html>
  `;
}

/**
 * Generate Status Update Email HTML
 */
function generateStatusUpdateEmail(customerName, statusMessage, device) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">WorthyTen</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px;">
      <p style="color: #333; font-size: 16px; margin: 0 0 20px;">Hi <strong>${customerName || "there"}</strong>,</p>
      
      <div style="background-color: #f0f4ff; border-left: 4px solid #667eea; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
        <p style="color: #333; font-size: 15px; margin: 0; line-height: 1.6;">${statusMessage}</p>
      </div>
      
      ${device ? `<p style="color: #666; font-size: 14px;">Device: <strong>${device.brandName || ""} ${device.modelName || ""}</strong></p>` : ""}
      
      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        Thank you for choosing WorthyTen!<br>
        <strong>- WorthyTen Team</strong>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eee;">
      <p style="color: #666; margin: 0; font-size: 12px;">
        📞 9843010746 | 🌐 <a href="https://worthyten.com" style="color: #667eea;">worthyten.com</a>
      </p>
    </div>
    
  </div>
</body>
</html>
  `;
}

/**
 * Generate Payment Complete Email HTML
 */
function generatePaymentCompleteEmail(customerName, amount, deviceName) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 Payment Complete!</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 30px; text-align: center;">
      <p style="color: #333; font-size: 16px;">Hi <strong>${customerName || "there"}</strong>,</p>
      
      <div style="background-color: #e8f5e9; border-radius: 12px; padding: 30px; margin: 20px 0;">
        <p style="color: #666; font-size: 14px; margin: 0 0 10px;">Amount Transferred</p>
        <p style="color: #4CAF50; font-size: 36px; font-weight: 700; margin: 0;">${formatPrice(amount)}</p>
        <p style="color: #666; font-size: 14px; margin: 15px 0 0;">for your ${deviceName || "device"}</p>
      </div>
      
      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        Thank you for selling with WorthyTen! We hope to serve you again.
      </p>
      
      <!-- Rating CTA -->
      <div style="margin: 30px 0;">
        <p style="color: #333; margin: 0 0 15px; font-size: 14px;">How was your experience?</p>
        <a href="https://worthyten.com/review" style="display: inline-block; background-color: #667eea; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-size: 14px; font-weight: 600;">
          ⭐ Rate Us
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #333; padding: 25px; text-align: center;">
      <p style="color: #fff; margin: 0 0 10px; font-size: 16px;">WorthyTen</p>
      <p style="color: #999; margin: 0; font-size: 12px;">📞 9843010746 | worthyten.com</p>
    </div>
    
  </div>
</body>
</html>
  `;
}

/**
 * Build notification message from pickup request data
 */
function buildPickupMessage(request) {
  const customer = request.customer || {};
  const device = request.device || {};
  const schedule = request.schedule || {};
  const price = request.finalPrice || 0;

  let message = `🔔 *New Pickup Request!*\n\n`;
  message += `*Customer:*\n`;
  message += `  Name: ${customer.name || "N/A"}\n`;
  message += `  Phone: ${customer.phone || "N/A"}\n`;
  if (customer.altPhone) message += `  Alt Phone: ${customer.altPhone}\n`;
  message += `  Email: ${customer.email || "N/A"}\n`;
  message += `  Address: ${customer.address || "N/A"}\n`;
  message += `  City: ${customer.city || "N/A"}\n\n`;
  message += `*Device:*\n`;
  message += `  Model: ${device.brandName || ""} ${device.modelName || "N/A"}\n`;
  message += `  Final Price: *${formatPrice(price)}*\n\n`;
  message += `*Pickup Slot:*\n`;
  message += `  Date: ${schedule.dateLabel || "Not specified"}\n`;
  message += `  Time: ${schedule.slot || "Not specified"}\n`;

  return message;
}

/**
 * Build customer WhatsApp confirmation message
 */
function buildCustomerConfirmation(request) {
  const customer = request.customer || {};
  const device = request.device || {};
  const schedule = request.schedule || {};
  const price = request.finalPrice || 0;

  return `✅ *Pickup Confirmed!*

Hi ${customer.name || "there"},

Your pickup for *${device.brandName || ""} ${device.modelName || ""}* has been scheduled.

📅 *Date:* ${schedule.dateLabel || "TBD"}
⏰ *Time:* ${schedule.slot || "TBD"}
💰 *Quoted Price:* ${formatPrice(price)}

Our agent will contact you to confirm.

Thank you for choosing WorthyTen! 🙏`;
}

/**
 * Main function: Notify on new pickup request
 * Sends notifications via Telegram, WhatsApp, and Email
 */
exports.notifyAdminOnNewRequest = functions.firestore
  .document("pickupRequests/{requestId}")
  .onCreate(async (snapshot, context) => {
    const request = snapshot.data();
    if (!request) {
      console.log("No data in snapshot.");
      return;
    }

    const customer = request.customer || {};
    const adminMessage = buildPickupMessage(request);

    // --- Send to Telegram (existing) ---
    await sendTelegramNotification(adminMessage);

    // --- Send to Admin WhatsApp ---
    if (ADMIN_WHATSAPP) {
      await sendWhatsAppMessage(ADMIN_WHATSAPP, adminMessage);
      console.log("WhatsApp admin notification sent!");
    }

    // --- Send Confirmation to Customer WhatsApp ---
    if (customer.phone) {
      const customerPhone = customer.phone.startsWith("+91")
        ? customer.phone
        : `+91${customer.phone}`;
      const customerMessage = buildCustomerConfirmation(request);
      await sendWhatsAppMessage(customerPhone, customerMessage);
      console.log("Customer WhatsApp confirmation sent!");
    }

    // --- Send Confirmation Email to Customer ---
    if (customer.email) {
      const emailHtml = generatePickupConfirmationEmail(request);
      await sendEmail(
        customer.email,
        "✅ Pickup Confirmed - WorthyTen",
        emailHtml
      );
      console.log("Customer email confirmation sent!");
    }
  });

/**
 * Notify when pickup status changes
 */
exports.notifyStatusChange = functions.firestore
  .document("pickupRequests/{requestId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only notify if status changed
    if (before.status === after.status) return;

    const customer = after.customer || {};
    const device = after.device || {};
    const newStatus = after.status;
    const price = after.finalPrice || 0;

    // Status-specific messages
    const statusMessages = {
      confirmed: `Your pickup has been confirmed! Our agent will arrive on ${after.schedule?.dateLabel || "the scheduled date"} at ${after.schedule?.slot || "the scheduled time"}.`,
      in_transit: `Our agent is on the way to pick up your ${device.brandName || ""} ${device.modelName || ""}!`,
      collected: `Device collected! We're now inspecting your ${device.brandName || ""} ${device.modelName || ""}.`,
      verified: `Device verified! Your final price is ${formatPrice(price)}.`,
      payment_initiated: `Payment of ${formatPrice(price)} has been initiated to your account!`,
      completed: `Payment complete! Thank you for selling with WorthyTen. We hope to serve you again!`,
      cancelled: `Your pickup request has been cancelled. Contact us at 9843010746 if you have questions.`,
    };

    const statusMessage = statusMessages[newStatus];
    if (!statusMessage) return;

    // Build full WhatsApp message
    const whatsappMessage = `Hi ${customer.name || "there"},\n\n${newStatus === "confirmed" ? "✅" : newStatus === "completed" ? "🎉" : newStatus === "cancelled" ? "❌" : "📦"} ${statusMessage}\n\n- WorthyTen Team`;

    // Send to customer WhatsApp
    if (customer.phone) {
      const customerPhone = customer.phone.startsWith("+91")
        ? customer.phone
        : `+91${customer.phone}`;
      await sendWhatsAppMessage(customerPhone, whatsappMessage);
      console.log(`WhatsApp status update (${newStatus}) sent to customer`);
    }

    // Send email for important statuses
    if (customer.email) {
      if (newStatus === "completed") {
        // Payment complete email
        const emailHtml = generatePaymentCompleteEmail(
          customer.name,
          price,
          `${device.brandName || ""} ${device.modelName || ""}`
        );
        await sendEmail(customer.email, "🎉 Payment Complete - WorthyTen", emailHtml);
      } else {
        // Status update email
        const emailHtml = generateStatusUpdateEmail(customer.name, statusMessage, device);
        await sendEmail(customer.email, `Order Update - WorthyTen`, emailHtml);
      }
      console.log(`Email status update (${newStatus}) sent to customer`);
    }

    // Notify admin on important status changes
    if (["cancelled", "completed"].includes(newStatus) && ADMIN_WHATSAPP) {
      const adminMsg = `Status Update: ${customer.name}'s order is now "${newStatus}"\nDevice: ${device.brandName || ""} ${device.modelName || ""}\nPrice: ${formatPrice(price)}`;
      await sendWhatsAppMessage(ADMIN_WHATSAPP, adminMsg);
    }
  });
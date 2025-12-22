const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const twilio = require("twilio");

admin.initializeApp();

const BOT_TOKEN = functions.config().telegram.token;
const CHAT_ID = functions.config().telegram.chat_id;

// Twilio WhatsApp Config
const TWILIO_SID = functions.config().twilio?.sid;
const TWILIO_AUTH = functions.config().twilio?.auth_token;
const TWILIO_WHATSAPP = functions.config().twilio?.whatsapp_number || functions.config().twilio?.from_number;

// Initialize Twilio client
let twilioClient = null;
if (TWILIO_SID && TWILIO_AUTH) {
  twilioClient = twilio(TWILIO_SID, TWILIO_AUTH);
}

// This is the function that will be triggered
exports.notifyAdminOnNewRequest = functions.firestore
  .document("pickupRequests/{requestId}")
  .onCreate(async (snapshot, context) => {

    // 1. Get the data from the new document
    const request = snapshot.data();
    if (!request) {
      console.log("No data in snapshot.");
      return;
    }

    // --- Safely get all parts of the data ---
    const customer = request.customer || {};
    const device = request.device || {};
    const schedule = request.schedule || {};
    const price = request.finalPrice || 0;

    // 2. Format a nice message for Telegram (admin)
    let message = `🔔 *New Pickup Request!*\n\n`;
    message += `*Customer:*\n`;
    message += `  Name: ${customer.name || "N/A"}\n`;
    message += `  Phone: ${customer.phone || "N/A"}\n`;
    if (customer.altPhone) {
      message += `  Alt Phone: ${customer.altPhone}\n`;
    }
    message += `  Address: ${customer.address || "N/A"}\n`;
    message += `  City: ${customer.city || "N/A"}\n\n`;

    message += `*Device:*\n`;
    message += `  Model: ${device.brandName || ""} ${device.modelName || "N/A"}\n`;
    message += `  Final Price: *₹${price.toLocaleString("en-IN")}*\n\n`;

    message += `*Pickup Slot:*\n`;
    message += `  Date: ${schedule.dateLabel || "Not specified"}\n`;
    message += `  Time: ${schedule.slot || "Not specified"}\n`;

    // 3. Send the message using the Telegram API
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      });
      console.log("Telegram notification sent!");
    } catch (error) {
      console.error("Error sending Telegram message:", error);
    }

    // --- Send Confirmation Email via Firebase Extension ---
    if (customer.email) {
      try {
        const db = admin.firestore();
        await db.collection("mail").add({
          to: customer.email,
          message: {
            subject: "✅ Pickup Confirmed - WorthyTen",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #fff; margin: 0;">WorthyTen</h1>
                </div>
                <div style="padding: 30px; background: #fff;">
                  <h2 style="color: #4CAF50;">✅ Pickup Confirmed!</h2>
                  <p>Hi <strong>${customer.name || "there"}</strong>,</p>
                  <p>Your pickup for <strong>${device.brandName || ""} ${device.modelName || ""}</strong> has been scheduled.</p>
                  
                  <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <p><strong>📅 Date:</strong> ${schedule.dateLabel || "To be confirmed"}</p>
                    <p><strong>⏰ Time:</strong> ${schedule.slot || "To be confirmed"}</p>
                    <p><strong>💰 Quote:</strong> ₹${price.toLocaleString("en-IN")}</p>
                  </div>
                  
                  <p><strong>📍 Pickup Address:</strong><br>
                  ${customer.address || ""}, ${customer.city || ""}</p>
                  
                  <p style="margin-top: 30px;">Our agent will contact you to confirm. Thank you for choosing WorthyTen! 🙏</p>
                </div>
                <div style="background: #333; padding: 20px; text-align: center;">
                  <p style="color: #fff; margin: 0;">📞 9843010746 | worthyten.com</p>
                </div>
              </div>
            `,
          },
        });
        console.log("Email queued for:", customer.email);
      } catch (emailError) {
        console.error("Error queuing email:", emailError);
      }
    }

    // --- Send WhatsApp Confirmation to Customer ---
    console.log("WhatsApp check:", {
      hasPhone: !!customer.phone,
      hasTwilioClient: !!twilioClient,
      hasWhatsAppNumber: !!TWILIO_WHATSAPP,
      whatsAppNumber: TWILIO_WHATSAPP
    });

    if (customer.phone && twilioClient && TWILIO_WHATSAPP) {
      try {
        const customerPhone = customer.phone.startsWith("+91")
          ? customer.phone
          : `+91${customer.phone.replace(/^0+/, "")}`;

        console.log("Sending WhatsApp to:", customerPhone);

        // Use Twilio Content Template for WhatsApp Business
        const messageData = {
          from: TWILIO_WHATSAPP,
          to: `whatsapp:${customerPhone}`,
          contentSid: "HXcbb081204a0cb005b6e3d41461ec7807", // worthyten_pickup_confirmed template
          contentVariables: JSON.stringify({
            "1": customer.name || "Customer",
            "2": `${device.brandName || ""} ${device.modelName || ""}`.trim() || "your device",
            "3": schedule.dateLabel || "To be confirmed",
            "4": schedule.slot || "To be confirmed",
            "5": `₹${price.toLocaleString("en-IN")}`
          }),
        };

        const result = await twilioClient.messages.create(messageData);
        console.log("WhatsApp confirmation sent! SID:", result.sid);
      } catch (whatsappError) {
        console.error("Error sending WhatsApp:", whatsappError.message, whatsappError.code);
      }
    } else {
      console.log("WhatsApp skipped - missing config or phone");
    }
  });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const BOT_TOKEN = functions.config().telegram.token;
const CHAT_ID = functions.config().telegram.chat_id;

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

    // ===================================================
    // THE FIX: Get the new 'schedule' data
    // ===================================================
    const schedule = request.schedule || {};
    // ===================================================

    const price = request.finalPrice || 0;

    // 2. Format a nice message
    let message = `🔔 *New Pickup Request!*\n\n`;
    message += `*Customer:*\n`;
    message += `  Name: ${customer.name || "N/A"}\n`;
    message += `  Phone: ${customer.phone || "N/A"}\n`;
    if (customer.altPhone) {
      message += `  Alt Phone: ${customer.altPhone}\n`;
    }
    message += `  Address: ${customer.address || "N/A"}\n`;
    message += `  City: ${customer.city || "N/A"}\n\n`; // Added city

    message += `*Device:*\n`;
    message += `  Model: ${device.brandName || ""} ${device.modelName || "N/As"}\n`;
    message += `  Final Price: *₹${price.toLocaleString("en-IN")}*\n\n`;

    // ===================================================
    // THE FIX: Add the schedule info to the message
    // ===================================================
    message += `*Pickup Slot:*\n`;
    message += `  Date: ${schedule.dateLabel || "Not specified"}\n`;
    message += `  Time: ${schedule.slot || "Not specified"}\n`;
    // ===================================================

    // 3. Send the message using the Telegram API
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown", // This lets us use *bold*
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
  });
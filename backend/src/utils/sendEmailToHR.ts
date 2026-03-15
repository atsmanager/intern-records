import axios from "axios";

export const sendJoiningReminderEmailToHR = async (candidate: any) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: process.env.BREVO_EMAIL_HR,
          name: "Centennial Infotech HR",
        },
        to: [
          {
            email: process.env.BREVO_EMAIL_HR,
          },
        ],
        subject: "Candidate Joining Reminder",
        textContent: `Reminder Alert 🚨

Candidate Name: ${candidate.name}
Email: ${candidate.email}
Joining Date: ${candidate.joiningDate.toDateString()}

This candidate is scheduled to join tomorrow.`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY_HR,
        },
      }
    );

    console.log("HR reminder mail sent via Brevo API");
  } catch (error: any) {
    console.error("Brevo API failed:", error.response?.data || error.message);
    throw error;
  }
};

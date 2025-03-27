import { sendEmail } from "./sendEmail.js";

export const sendVerificationCode = async function ( verificationCode, email, res) {

  try {
    sendEmail({email, verificationCode, templateType: 'registration'});
    res.status(200).json({
      success: true,
      message: `Verification email successfully sent to ${email}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to send verification code'
    })
  }
}
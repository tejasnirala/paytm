import ErrorHandler from "../../middlewares/error.js";
import { User } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { sendEmail } from "../../utils/sendEmail.js";

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  try {
    const userEmail = req.body.username;

    const user = await User.findOne({ username: userEmail, accountVerified: true });
    if(!user) {
      return next(new ErrorHandler('User does not exist', 404));
    }
  
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;
    try {
      sendEmail({email: userEmail, verificationCode: resetPasswordUrl, templateType: 'resetMail'});
      res.status(200).json({
        success: true,
        message: `Password reset email sent successfully to '${user.username}'`
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave: false});
      return next(new ErrorHandler(error.message ? error.message : 'Cannot sent reset password token', 500))
    }
  } catch (error) {
    next()
  }
});
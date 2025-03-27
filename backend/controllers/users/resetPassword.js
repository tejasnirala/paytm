import ErrorHandler from "../../middlewares/error.js";
import { User } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import crypto from "crypto"

export const resetPassword = catchAsyncError(async (req, res, next) => {
  try {
    const {token} = req.params;

    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now()
      }
    });
  
    if(!user) {
      return next(new ErrorHandler('Reset password token is invalid or has been expired', 400));
    }
  
    if(req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Password and Confirm Password do not match', 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    res.status(200).json({
      message: 'Password Reset Successfully'
    });
  } catch (error) {
    next()
  }
});
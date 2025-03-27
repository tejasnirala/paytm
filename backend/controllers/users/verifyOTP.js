import ErrorHandler from '../../middlewares/error.js';
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { User } from '../../models/index.js';

export const verifyOTP = catchAsyncError(async (req, res, next) => {

  const { username, otp } = req.body;

  try {
    const userAllEntries = await User.find({
      username, accountVerified: false
    }).sort({ createdAt: -1 });

    if (!userAllEntries) {
      return next(new ErrorHandler('User not found', 404));
    }

    let user;

    if (userAllEntries.length > 1) {
      user = userAllEntries[0];

      await User.deleteMany({
        _id: { $ne: user._id },
        username,
        accountVerified: false
      });
    } else {
      user = userAllEntries[0];
    }
    
    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler('Invalid OTP', 404));
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler('OTP Expired', 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      message: 'Account Verified'
    })
  } catch (error) {
    return next(new ErrorHandler('Internal Server Error', 500));
  }
});

import ErrorHandler from "../../middlewares/error.js";
import { Account, User } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import { sendVerificationCode } from "../../utils/sendVerificationCode.js";
import { signUpBody } from "../../utils/user-input-validations.js"

export const signup = catchAsyncError(async (req, res, next) => {
  try {
    const createPayload = req.body;
    const parsedPayload = signUpBody.safeParse(createPayload);

    if (!parsedPayload.success) {
      return next(new ErrorHandler('All fields are required', 400))
    }

    const existingUser = await User.findOne({
      username: req.body.username,
      accountVerified: true
    });

    if (existingUser) {
      return res.status(411).json({
        message: "Username already taken"
      });
    }

    // Rate limiting
    const registerationAttemptsByUser = await User.find({
      username: req.body.username,
      accountVerified: false
    });

    if (registerationAttemptsByUser.length > 3) {
      return next(
        new ErrorHandler(
          'You have exceeded the maximum number of attempts (3). Please try again after an hour.',
          400
        )
      );
    }


    const userData = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }

    const user = await User.create(userData);

    const userId = user._id;

    await Account.create({
      userId: userId,
      balance: 1 + parseInt(Math.random() * 1000000)
    })

    const verificationCode = await user.generateVerificationCode();
    await user.save();
    sendVerificationCode(verificationCode, req.body.username, res);
  } catch (error) {
    next()
  }
});
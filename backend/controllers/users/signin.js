import jwt from "jsonwebtoken";
import { User } from "../../models/index.js";
import { signInBody } from "../../utils/user-input-validations.js"
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';
import ErrorHandler from "../../middlewares/error.js";

export const signin = catchAsyncError(async (req, res, next) => {
  try {
    const createPayload = req.body;
    const parsedPayload = signInBody.safeParse(createPayload);
  
    if(!parsedPayload.success) {
      return res.status(411).json({
        message: "Incorrect inputs"
      });
    }
  
    const user = await User.findOne({
      username: req.body.username,
      accountVerified: true
    }).select('+password');
  
    if(!user) {
      return res.status(400).json({
        message: "User with username not found"
      });
    }

    const isPasswordMatched = await user.comparePassword(req.body.password);
    if(!isPasswordMatched) {
      return res.status(400).json({
        message: "Wrong Password"
      });
    }
    
    const token = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET);
  
    res.status(200).json({
      token: token
    })
  } catch (error) {
    next()
  }
});
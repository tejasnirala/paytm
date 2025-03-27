import { User } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';

export const me = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.userId
    });
  
    res.status(200).json({
      user
    })
  } catch (error) {
    next()
  }
});
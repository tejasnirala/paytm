import { Account } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';

export const balance = catchAsyncError(async (req, res, next) => {
  try {
    const accountDetail = await Account.findOne({
      userId: req.userId
    });
  
    const balance = accountDetail.balance;
  
    res.status(200).json({
      balance 
    });
  } catch (error) {
    next()
  }
});
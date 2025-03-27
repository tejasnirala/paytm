import mongoose from "mongoose";
import { Account } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';

export const transfer = catchAsyncError(async (req, res, next) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // message: "Insufficient balance" - 400
    const requiredBalance = req.body.amount;
    const toAccountNumber = req.body.to;

    const accountDetail = await Account.findOne({
      userId: req.userId
    }).session(session);

    const availableBalance = accountDetail.balance;

    if(availableBalance < requiredBalance) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }


    // message: "Invalid account" - 400
    const toAccount = await Account.findOne({
      userId: toAccountNumber
    }).session(session);

    if(!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account"
      });
    }

    // transfer successful - 200
    await Account.updateOne({userId: req.userId},{$inc: {balance: -requiredBalance}}).session(session);
    await Account.updateOne({userId: toAccountNumber}, {$inc: {balance: requiredBalance}}).session(session);

    await session.commitTransaction();

    res.status(200).json({
      message: "Transfer successful"
    });
  } catch (error) {
    next()
  }
});
import { User } from "../../models/index.js";
import { dataUpdateBody } from "../../utils/user-input-validations.js"
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';

export const update = catchAsyncError(async (req, res, next) => {
  try {
    const createPayload = req.body;
    const parsedPayload = dataUpdateBody.safeParse(createPayload);
  
    if(!parsedPayload.success) {
      return res.status(411).json({
        message: "Error while updating information"
      })
    }
  
    await User.updateOne({_id: req.userId}, req.body);
  
    res.status(200).json({
      message: "Updated successfully"
    });
  } catch (error) {
    next()
  }
});
import { User } from "../../models/index.js";
import { catchAsyncError } from '../../middlewares/catchAsyncError.js';

export const bulk = catchAsyncError(async (req, res, next) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [{
        firstName: {
          "$regex": filter
        },
      }, {
        lastName: {
          "$regex": filter
        }
      }]
    });

    res.json({
      user: users.map(user => ({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }))
    })
  } catch (error) {
    next()
  }
});
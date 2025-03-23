import { Router } from "express";
import jwt from "jsonwebtoken";
import { Account, User } from "../../../db/index.js";
import { signUpBody, signInBody, dataUpdateBody } from "../../../utils/user-input-validations.js"
import { JWT_SECRET } from "../../../configs/config.js";
import { authMiddleware } from "../../../middlewares/middleware.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = signUpBody.safeParse(createPayload);

  if(!parsedPayload.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username
  });

  if(existingUser) {
    return res.status(411).json({
      message: "Email already taken"
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  const userId = user._id;

  await Account.create({
    userId: userId,
    balance: 1 + parseInt(Math.random()*1000000)
  })

  const token = jwt.sign({
    userId
  }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token: token
  });
});


router.post("/signin", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = signInBody.safeParse(createPayload);

  if(!parsedPayload.success) {
    return res.status(411).json({
      message: "Incorrect inputs"
    });
  }

  const user = await User.findOne({
    username: req.body.username
  });

  if(!user) {
    return res.status(411).json({
      message: "Error while logging in"
    });
  }

  const userId = user._id;

  const token = jwt.sign({
    userId
  }, JWT_SECRET);

  res.status(200).json({
    token: token
  })
})

router.put("/", authMiddleware, async (req, res) => {
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
})

router.get("/bulk", authMiddleware, async (req, res) => {
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
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    }))
  })
})

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId
  }).select("-password");

  res.status(200).json({
    user
  })
})

export default router;
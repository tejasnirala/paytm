import mongoose from "mongoose";

export const connection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected to host: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Some error occured while connecting to database: ${err}`);
  }
}
import mongoose, { mongo } from "mongoose";

const connectToDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI);
    if (connection) {
      console.log("Connected to Database!");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;

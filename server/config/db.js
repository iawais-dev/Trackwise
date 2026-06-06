
import mongoose from "mongoose";

const connectDataBase = async () => {

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/trackwise`, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export const ConnectDb = connectDataBase

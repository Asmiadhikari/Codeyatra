import mongoose from "mongoose";

const dbUserName = "";
const dbPassword = encodeURIComponent("");
const dbHost = "asmi.wdnvneq.mongodb.net";
const dbName = "User";
const dbOptions = "retryWrites=true&w=majority&appName=Asmi";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`
    );
    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit();
  }
};

export default connectDB;

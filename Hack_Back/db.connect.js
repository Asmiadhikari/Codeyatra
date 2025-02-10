import mongoose from "mongoose";

const dbUserName = "Alina";
const dbPassword ="89FzopOqnUfmpcIg";
const dbHost = "alina.rzdrsdl.mongodb.net";
const dbName = "Donor";
const dbOptions = "retryWrites=true&w=majority&appName=Alina";

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

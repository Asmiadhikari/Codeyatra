import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  userType: { type: String, enum: ["donor", "receiver"], required: true },
  recipientType: {
    type: String,
    default: null,
    enum: ["","orphanage", "shelter", "ngo", "poultry farming"],
    // function() {
    //   return this.userType === "receiver";
    // },
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;

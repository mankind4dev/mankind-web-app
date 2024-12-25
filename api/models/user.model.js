import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unigue: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsupport.hubstaff.com%2Fprofile-pictures-for-hubstaff-talent%2F&psig=AOvVaw13xP0Vy-nRLcz6Ws0yc6Et&ust=1726187309792000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCQ-v2SvIgDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true } //Timee  oof creation annd  time of updating
);

const User = mongoose.model("User", userSchema);
export default User;

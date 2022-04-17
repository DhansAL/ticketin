import mongoose from "mongoose";

interface UserCreds {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// takes creds which are in interface, better than giving your model an interface in generic i think.
const buildUser = (creds: UserCreds) => {
  return new User(creds);
};
buildUser({
  password: "ds",
  email: "Ds",
});
export const User = mongoose.model("User", userSchema);

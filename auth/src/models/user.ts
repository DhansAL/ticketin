import mongoose from "mongoose";
import { Encryption } from "../services/encryption";

interface UserCreds {
  email: string;
  password: string;
}
// an interface that describes the properties that a usermodel has
interface UserModel extends mongoose.Model<any> {
  build(creds: UserCreds): UserDoc; //return a user doc
}

//an interface that a single user has , all the properties of an user doc
interface UserDoc extends mongoose.Document {
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

//mongoose middleware
// we call the callback fn done instead of using --await
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Encryption.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// takes creds which are in interface, better than giving your model an interface in generic i think.
userSchema.statics.build = (creds: UserCreds) => {
  return new User(creds);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

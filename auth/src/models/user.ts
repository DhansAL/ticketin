import mongoose from "mongoose";

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

// takes creds which are in interface, better than giving your model an interface in generic i think.
userSchema.statics.build = (creds: UserCreds) => {
  return new User(creds);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };

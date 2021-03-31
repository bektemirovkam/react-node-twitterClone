import { Schema, model, Document } from "mongoose";

export interface UserModelInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmed: boolean;
  confirmHash: string;
  location?: string;
  about?: string;
  website?: string;
  token?: string;
}

export type UserDocumentType = UserModelInterface & Document;

const userSchema = new Schema<UserDocumentType>({
  email: {
    unique: true,
    require: true,
    type: String,
  },
  fullname: {
    require: true,
    type: String,
  },
  username: {
    type: String,
    unique: true,
    require: true,
  },
  location: String,
  password: {
    type: String,
    require: true,
    // select: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmHash: {
    require: true,
    type: String,
    // select: false,
  },
  about: String,
  website: String,
}, {
  timestamps: true
});

userSchema.set("toJSON", {
  transform: function (_: any, obj: any) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserDocumentType>("User", userSchema);

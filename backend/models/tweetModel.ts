import { Schema, model, Document } from "mongoose";
import { UserModelInterface } from "./userModel";

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: UserModelInterface;
  images?: string[];
}

export type TweetDocumentType = TweetModelInterface & Document;

const tweetSchema = new Schema<TweetDocumentType>({
  text: {
    require: true,
    type: String,
    maxLength: 280
  },
  user: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  images: {
    type: [String]
  }
},{
  timestamps: true
});



export const TweetModel = model<TweetDocumentType>("Tweet", tweetSchema);

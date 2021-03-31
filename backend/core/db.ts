import mongoose from "mongoose";

mongoose.Promise = Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/twitter-clone",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

export { db, mongoose };

// const mongoDbURI =
//   "mongodb+srv://Kamil:q2e4KYkARz4r4Bq@cluster0.ot3mv.mongodb.net/twitter-clone?retryWrites=true&w=majority";

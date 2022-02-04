// import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// design schema
const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    likes: [
     {
      user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
      }
     } 
    ],
    comments: [
     {
      user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
     } 
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postSchema);

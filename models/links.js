const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9]{6,8}$/,
    },

    url: {
      type: String,
      required: true,
    },

    title: {
      type: String,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    lastClicked: {
      type: Date,
      default: null,
    },

    history: [
      {
        ts: { type: Date },
        ip: String,
        ua: String,
        referrer: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Longlink", linkSchema);

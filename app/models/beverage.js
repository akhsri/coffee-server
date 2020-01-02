const mongoose = require("mongoose");

const beverageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    cost: {
      type: Number,
      required: true,
      min: 1
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageLink: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Beverage = mongoose.model("Beverage", beverageSchema);

module.exports = Beverage;

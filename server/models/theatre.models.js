import { model, Schema } from "mongoose";

const TheatreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Theatre = new model("theatre", TheatreSchema);

export default Theatre;

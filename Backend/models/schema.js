import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/SpeakX_Test_Data")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    solution: { type: String,required: true },
    options: [
      {
        text: { type: String },
        isCorrectAnswer: { type: Boolean },
      },
    ],
  },
  { collection: "QuestionData" }
);

export const Question = mongoose.model("Question", questionSchema);

import mongoose from "mongoose";
const URI =
  "mongodb+srv://Shivanshu:bGi2RLrwgxha9WRh@cluster0.oxwedsx.mongodb.net/SpeakX_Test_Data?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    solution: { type: String, required: true },
    options: [
      {
        text: { type: String },
        isCorrectAnswer: { type: Boolean },
      },
    ],
    blocks: [
      {
        text: { type: String },
        showInOption: { type: Boolean },
        isAnswer: { type: Boolean },
      },
    ],
  },
  { collection: "QuestionData" }
);

export const Question = mongoose.model("Question", questionSchema);

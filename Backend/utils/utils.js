import { Question } from "../models/schema.js";

export const findById = async (call, callback) => {
  const { id } = call.request;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return callback(null, { error: "Question not found", status: 404 });
    }
    console.log("Question Found - ", question);
    callback(null, {
      question: {
        id: question._id.toString(),
        title: question.title,
        type: question.type,
        solution: question.solution,
        options: question.options.map((o) => ({
          text: o.text,
          isCorrect: o.isCorrectAnswer,
        })),
      },
    });
  } catch (error) {
    console.error(error);
    callback(null, { error: "Failed to fetch question details", status: 500 });
  }
};

export const searchQuestions = async (call, callback) => {
  const { query, page = 1, limit = 10, type = "" } = call.request;

  const searchQuery = {
    ...(query ? { title: { $regex: query, $options: "i" } } : {}),
    ...(type ? { type: type } : {}),
  };

  const questions = await Question.find(searchQuery)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  console.log("questions - ", questions);
  const total = await Question.countDocuments(searchQuery);

  callback(null, {
    questions: questions.map((q) => ({
      id: q._id.toString(),
      title: q.title,
      type: q.type,
      solution: q.solution,
      options: q.options.map((o) => ({
        text: o.text,
        isCorrect: o.isCorrectAnswer,
      })),
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
};

import { Question } from "../models/schema.js";

export const findById = async (call, callback) => {
  const { id } = call.request;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return callback(null, { error: "Question not found", status: 404 });
    }

    const response = {
      id: question._id.toString(),
      title: question.title,
      type: question.type,
      solution: question.solution,

      // For MCQ type questions
      options: question.options.map((o) => ({
        text: o.text,
        isCorrect: o.isCorrectAnswer,
      })),

      // For Anagram type questions
      blocks: question.blocks.map((b) => ({
        text: b.text,
        showInOption: b.showInOption,
        isAnswer: b.isAnswer,
      })),
      anagramType: question.anagramType,
    };

    callback(null, response);
  } catch (error) {
    console.error(error);
    callback(null, { error: "Failed to fetch question details", status: 500 });
  }
};

export const searchQuestions = async (call, callback) => {
  const { query, page = 1, limit = 10, type } = call.request;
  let typeArr = [];
  if (type) {
    typeArr = type
      .toUpperCase()
      .split(",")
      .map((t) => t.trim()); // Trim spaces around each type
  }

  console.log("Received search request:", query, page, limit, typeArr);

  const searchQuery = {
    ...(typeArr.length > 0 && { type: { $in: typeArr } }),
    ...(query && { title: { $regex: query, $options: "i" } }),
  };

  try {
    const questions = await Question.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Question.countDocuments(searchQuery);

    const response = {
      questions: questions.map((q) => ({
        id: q._id.toString(),
        title: q.title,
        type: q.type,
        solution: q.solution,
        options: q.options.map((o) => ({
          text: o.text,
          isCorrect: o.isCorrectAnswer,
        })),
        anagramType: q.anagramType, // Added field
      })),
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };

    callback(null, response);
  } catch (error) {
    console.error("Error in searchQuestions:", error);
    callback(null, { error: "Failed to fetch questions", status: 500 });
  }
};

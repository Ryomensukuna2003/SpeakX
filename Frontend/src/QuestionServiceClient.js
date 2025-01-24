import { QuestionServiceClient } from "./proto/questions_grpc_web_pb";
import { SearchRequest, IDRequest } from "./proto/questions_pb";

const client = new QuestionServiceClient("http://localhost:8080");

export const searchQuestions = (query, page, limit, type) => {
  return new Promise((resolve, reject) => {
    const request = new SearchRequest();
    request.setQuery(query);
    request.setPage(page);
    request.setLimit(limit);
    request.setType(type);

    client.searchQuestions(request, {}, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err.message, err.code);
        reject(err);
      } else {
        console.log("gRPC Response:", response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

export const getQuestion = (id) => {
  return new Promise((resolve, reject) => {
    const request = new IDRequest();
    request.setId(id);

    client.findByID(request, {}, (err, response) => {
      if (err) {
        console.error("gRPC Error:", err.message, err.code);
        reject(err);
      } else {
        console.log("gRPC Response:", response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

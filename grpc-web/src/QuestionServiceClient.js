import { QuestionServiceClient } from "./proto/questions_grpc_web_pb";
import { SearchRequest } from "./proto/questions_pb";

// Assuming your backend gRPC server is running on port 9090
const client = new QuestionServiceClient("http://localhost:8080");

export const searchQuestions = (query, page, limit) => {
  return new Promise((resolve, reject) => {
    const request = new SearchRequest();
    request.setQuery(query);
    request.setPage(page);
    request.setLimit(limit);

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

import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { findById, searchQuestions } from "./utils/utils.js";

const PROTO_PATH = "../proto/questions.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const questionProto =
  grpc.loadPackageDefinition(packageDefinition).QuestionService;

const server = new grpc.Server();
server.addService(questionProto.service, {
  SearchQuestions: searchQuestions,
  FindByID: findById,
});

const PORT = 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err) => {
    if (err) {
      console.error("Failed to bind server:", err);
      return;
    }
    console.log(`gRPC server is running on port ${PORT}`);
  }
);

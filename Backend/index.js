import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { findById, searchQuestions } from "./utils/utils.js";
import { ReflectionService } from "@grpc/reflection";

const PROTO_PATH = "/home/sukuna/Desktop/SpeakX/proto/questions.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const questionProto = protoDescriptor.questions.QuestionService;

if (!questionProto) {
  console.error("Failed to load QuestionService definition");
  process.exit(1);
}

const server = new grpc.Server();

server.addService(questionProto.service, {
  SearchQuestions: searchQuestions,
  FindByID: findById,
});

const reflection = new ReflectionService(packageDefinition);
reflection.addToServer(server);

const PORT = 9090;
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

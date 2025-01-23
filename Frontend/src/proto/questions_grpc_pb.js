// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var questions_pb = require('./questions_pb.js');

function serialize_questions_IDRequest(arg) {
  if (!(arg instanceof questions_pb.IDRequest)) {
    throw new Error('Expected argument of type questions.IDRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_questions_IDRequest(buffer_arg) {
  return questions_pb.IDRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_questions_IDResponse(arg) {
  if (!(arg instanceof questions_pb.IDResponse)) {
    throw new Error('Expected argument of type questions.IDResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_questions_IDResponse(buffer_arg) {
  return questions_pb.IDResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_questions_SearchRequest(arg) {
  if (!(arg instanceof questions_pb.SearchRequest)) {
    throw new Error('Expected argument of type questions.SearchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_questions_SearchRequest(buffer_arg) {
  return questions_pb.SearchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_questions_SearchResponse(arg) {
  if (!(arg instanceof questions_pb.SearchResponse)) {
    throw new Error('Expected argument of type questions.SearchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_questions_SearchResponse(buffer_arg) {
  return questions_pb.SearchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var QuestionServiceService = exports.QuestionServiceService = {
  searchQuestions: {
    path: '/questions.QuestionService/SearchQuestions',
    requestStream: false,
    responseStream: false,
    requestType: questions_pb.SearchRequest,
    responseType: questions_pb.SearchResponse,
    requestSerialize: serialize_questions_SearchRequest,
    requestDeserialize: deserialize_questions_SearchRequest,
    responseSerialize: serialize_questions_SearchResponse,
    responseDeserialize: deserialize_questions_SearchResponse,
  },
  findByID: {
    path: '/questions.QuestionService/FindByID',
    requestStream: false,
    responseStream: false,
    requestType: questions_pb.IDRequest,
    responseType: questions_pb.IDResponse,
    requestSerialize: serialize_questions_IDRequest,
    requestDeserialize: deserialize_questions_IDRequest,
    responseSerialize: serialize_questions_IDResponse,
    responseDeserialize: deserialize_questions_IDResponse,
  },
};

exports.QuestionServiceClient = grpc.makeGenericClientConstructor(QuestionServiceService);

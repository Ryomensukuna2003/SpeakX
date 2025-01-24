# SpeakX Assignment

This project is an assignment for the company SpeakX.

## Project Structure

- `Frontend/`: Contains the frontend code of the project.
- `Backend/`: Contains the backend code of the project.
- `Proto/` : Contains the proto files for the gRPC service.

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Frontend

1. Navigate to the `Frontend` directory:
    ```sh
    cd Frontend
    npm install
    npm start
    ```

### Backend

1. Navigate to the `Backend` directory:
    ```sh
    cd Backend
    npm install
    npm start
    ```

## Database Queries

For faster database queries, the following index was used:

```js
db.QuestionData.createIndex({ type: 1, title: 1 })
```

## Envoy

As gRPC doesn't have native browser support, I have used a proxy server (Envoy) to make the gRPC calls. 
The .yaml file can be found in the `Backend` directory.




## ProtoBuff
Protoc command to generate the gRPC code:
```sh
protoc --js_out=import_style=commonjs,binary:./Frontend/src/proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./Frontend/src/proto -I ./proto ./proto/questions.proto

```
This will generate necessary files in the `Frontend/src/proto` directory.

# RabbitMQ React Tasks

A simple task queue demo using RabbitMQ, Node.js, and React. This project demonstrates how to integrate RabbitMQ as a messaging broker with a real-time frontend using WebSockets. The backend handles task production and consumption, while the frontend displays updates as tasks are processed.

This example uses Docker to run RabbitMQ for easy setup.

## Features

- **RabbitMQ** for messaging and task queuing.
- **WebSockets** for real-time updates from the backend to the frontend.
- **Node.js/Express** backend for producing and consuming tasks.
- **React** frontend to display task updates in real-time.

## Prerequisites

1. **Docker**: Ensure Docker is installed and updated.
   - [Get Docker](https://www.docker.com/)
2. **Node.js**: Install Node.js (v14 or later) if not already installed.
   - [Get Node.js](https://nodejs.org/)

## Setup and Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rabbitmq-react-tasks.git
cd rabbitmq-react-tasks
```

### 2. Start RabbitMQ with Docker

Run the following command to start RabbitMQ in Docker:

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### 3. Install Backend Dependencies

Navigate to the backend folder and install the required Node.js modules:

```bash
cd backend
npm install
```

### 4. Start the Backend Server

Run the following command to start the backend:

```bash
node server.js
```

### 5. Install Frontend Dependencies

In a separate terminal, navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install
```

### 6. Start the Frontend App

Run the following command to start the React app:

```bash
npm start
```

The app will open in your default browser at http://localhost:3000.

## Usage

1. Open the frontend at http://localhost:3000.
2. Enter a task in the input box and click "Add Task".
3. The backend will queue the task, process it, and notify the frontend via WebSockets.
4. Processed tasks will appear in the "Completed Tasks" list in real-time.

## How It Works

1. **Task Submission**:

   - When you enter a task in the frontend and click "Add Task," the task is sent to the backend via a REST API (`/tasks`).
   - The backend queues the task in RabbitMQ.

2. **Task Processing**:

   - The backend runs a consumer process that listens for new tasks in RabbitMQ.
   - The consumer processes the task and emits a real-time update to the frontend using WebSockets.

3. **Real-Time Updates**:

   - The frontend listens for updates from the backend via WebSocket.
   - Processed tasks are displayed dynamically in the "Completed Tasks" list.

4. **RabbitMQ Management**:
   - You can monitor RabbitMQ using its management UI at `http://localhost:15672`.
   - Login credentials:
     - Username: `guest`
     - Password: `guest`
   - Under the **Queues** tab, you’ll see the `tasks` queue, where tasks are briefly stored before being processed.

## Notes

This project is designed as a learning example to showcase how to:

- Use RabbitMQ as a message broker.
- Connect backend services to a React frontend via WebSockets.
- Run RabbitMQ in Docker for local development.
  Feel free to extend or adapt this code for more complex use cases.

## CORS

If you encounter errors related to CORS while running the app, it's due to the browser blocking cross-origin requests between the frontend (`http://localhost:3000`) and the backend (`http://localhost:4000`).

The backend is configured to allow CORS for development purposes by using the `cors` package. You can find the relevant configuration in `server.js`:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
}));
```

## License

This project is licensed under the MIT License.
```

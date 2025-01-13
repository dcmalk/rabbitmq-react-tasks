import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const TaskList = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io('http://localhost:4000');

    // Listen for completed tasks from backend
    socket.on('taskCompleted', (task) => {
      setCompletedTasks((prev) => [...prev, task]);
    });

    // Cleanup socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

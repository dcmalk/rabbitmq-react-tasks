import React, { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const App = () => {
  const [task, setTask] = useState('');

  // Send task to backend queue
  const addTask = async () => {
    if (!task) return;
    try {
      await axios.post('http://localhost:4000/tasks', { task });
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h1>RabbitMQ Task Queue</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" />
      <button onClick={addTask}>Add Task</button>
      <TaskList />
    </div>
  );
};

export default App;

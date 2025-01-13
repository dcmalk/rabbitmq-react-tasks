const amqp = require('amqplib');

const QUEUE_NAME = 'tasks';

// Function to send a message to the queue
const sendMessage = async (message) => {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Connect to RabbitMQ
    const channel = await connection.createChannel(); // Create a channel

    await channel.assertQueue(QUEUE_NAME, { durable: true }); // Ensure the queue exists

    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true }); // Send message
    console.log(`Sent: ${message}`);

    await channel.close(); // Close channel
    await connection.close(); // Close connection
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

module.exports = { sendMessage };

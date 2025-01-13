const amqp = require('amqplib');

const QUEUE_NAME = 'tasks';

// Function to consume messages from the queue
const consumeMessages = async (onMessageCallback) => {
  try {
    const connection = await amqp.connect('amqp://localhost'); // Connect to RabbitMQ
    const channel = await connection.createChannel(); // Create a channel

    await channel.assertQueue(QUEUE_NAME, { durable: true }); // Ensure the queue exists

    console.log(`Waiting for messages in ${QUEUE_NAME}...`);
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log(`Received: ${message}`);
        onMessageCallback(message); // Process message
        channel.ack(msg); // Acknowledge message
      }
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
};

module.exports = { consumeMessages };

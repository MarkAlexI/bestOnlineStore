import logger from './utils/logger.js';
import { createChatHistory } from './utils/createChatHistory.js';

const chatHistory = createChatHistory();

const chatHandler = (ws, req) => {
  const path = req.url;

  ws.send('Welcome to the online store chat! How can I assist you today?');

  ws.on('message', (message) => {
    logger.info(`Received message for path ${path}: ${message}`);

    try {
      const data = JSON.parse(message);

      chatHistory.addRecord(data.text);

      if (data.type === 'text') {
        questionsHandler(data.text, ws);
      } else if (data.type === 'command') {
        commandHandler(data.command, ws);
      } else {
        logger.warn(`Unknown message type: ${data.type}`);
      }
    } catch (error) {
      logger.error(`Error parsing message: ${error.message}`);
    }
  });

  ws.on('close', () => {
    logger.info(`WebSocket connection closed for path: ${path}`);
  });
};

function questionsHandler(text, ws) {
  let answer = '', question = text.toLowerCase();

  if (question.includes('payment') || question.includes('оплат')) {
    answer = 'Можлива оплата при отриманні товару або карткою через iPay.';
  } else if (question.includes('delivery') || question.includes('доставк')) {
    answer = 'Можлива доставка Новою Поштою, кур\'єром або самовивіз (по Києву) та Укрпоштою.';
  } else {
    answer = 'Уточніть, будь-ласка, питання.';
  }

  chatHistory.addRecords(answer);

  ws.send(answer);

  return;
}

function commandHandler(command, ws) {
  chatHistory.addRecord(command);

  switch (command) {
  case '/help':
    ws.send('Available commands:\n/help - Display this help message\n/history - Show chat history\n/logout - Log out from the chat');
    break;
  case '/history':
    sendChatHistory(ws);
    break;
  case '/logout':
    handleLogout(ws);
    break;
  default:
    logger.warn(`Unknown command: ${command}`);
  }

  return;
}

function sendChatHistory(ws) {
  ws.send(`Chat History:\n${chatHistory.getRecords()}`);

  return;
}

function handleLogout(ws) {
  ws.send('You have been logged out. Thank you for chatting!');
  ws.close();

  return;
}

export default chatHandler;

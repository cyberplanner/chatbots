const restify = require('restify');
const builder = require('botbuilder');

// Create server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, ()=> {
  console.log('Listening to', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
  appId: process.env.MS_APP_ID,
  appPassword: process.env.MS_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages/', connector.listen());

const bot = new builder.UniversalBot(connector, (session) => {
  session.send("You said: " + session.message.text);
});
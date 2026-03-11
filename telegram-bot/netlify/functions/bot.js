const bot = require('../../bot-logic');

// Handler pour Netlify Functions
exports.handler = async (event, context) => {
  try {
    // Vérifier que c'est une requête POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
    }

    // Parser le body
    const body = JSON.parse(event.body);
    
    // Traiter l'update avec le bot
    await bot.handleUpdate(body);
    
    return {
      statusCode: 200,
      body: 'OK'
    };
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};

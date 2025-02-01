const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function convertTextToLanguage(inputText, languageCode) {
  try {
    const aiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Constructing the translation request
    const translationPrompt = `Convert the following text to ${languageCode}:\n\n"${inputText}"`;

    const translationResult = await aiModel.generateContent(translationPrompt);
    const response = await translationResult.response;
    const translatedText = response.text().trim().replace(/"/g, ''); // Remove extra quotation marks

    return translatedText;
  } catch (error) {
    console.error(`Error during translation to ${languageCode}. Using original text instead.`, error);
    return inputText; // Default to original text in case of failure
  }
}

module.exports = { convertTextToLanguage };

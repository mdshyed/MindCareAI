const axios = require('axios');
const logger = require('../utils/logger');

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are MindCareAI's AI mental health support assistant — a digital mental health and psychological support system designed for students in higher education.

Your role:
- Listen actively and validate users' feelings
- Provide supportive, non-judgmental responses
- Offer practical coping strategies when appropriate
- Encourage professional help for serious concerns
- Maintain a warm, understanding, and professional tone
- Never provide medical diagnoses or replace professional therapy
- Focus on emotional support, mindfulness, and self-care

If asked about your origins, respond that you are MindCareAI's AI assistant, built to provide mental health support to students.

Always respond in a caring, supportive manner. Keep responses concise but meaningful (2-4 sentences typically).`;

const sendMessage = async (req, res, next) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message?.trim()) {
            return res.status(400).json({ success: false, message: 'Message is required.' });
        }

        const apiKey = process.env.GROQ_API_KEY?.trim();
        if (!apiKey) {
            return res.status(503).json({ success: false, message: 'AI service is not configured.' });
        }

        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory.slice(-10),
            { role: 'user', content: message.trim() },
        ];

        const response = await axios.post(
            GROQ_API_URL,
            { model: 'llama-3.3-70b-versatile', messages, temperature: 0.7, max_tokens: 500, stream: false },
            {
                headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                timeout: 30000,
            }
        );

        const aiResponse = response.data.choices[0]?.message?.content;
        if (!aiResponse) {
            return res.status(502).json({ success: false, message: 'No response received from AI service.' });
        }

        res.status(200).json({ success: true, message: aiResponse.trim() });
    } catch (error) {
        if (error.response?.status === 401) {
            logger.error('Groq API: Invalid API key');
            return res.status(502).json({ success: false, message: 'AI service authentication failed.' });
        }
        if (error.response?.status === 429) {
            return res.status(429).json({ success: false, message: 'AI service rate limit reached. Please try again shortly.' });
        }
        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({ success: false, message: 'AI service timed out. Please try again.' });
        }
        next(error);
    }
};

module.exports = { sendMessage };

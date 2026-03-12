module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    // Convert message history to Gemini format
    const geminiMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: system || '' }]
          },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: error.error?.message || 'Gemini API error'
      });
    }

    const data = await response.json();

    // Extract the reply text from Gemini's response format
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Sorry, I could not generate a response. Please try again.';

    // Return in the same format the frontend expects
    return res.status(200).json({
      content: [{ type: 'text', text: replyText }]
    });

  } catch (err) {
    console.error('API proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

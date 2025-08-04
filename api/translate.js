import { translate } from '@vitalets/google-translate-api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { text, to = 'en', from } = req.body;

  if (!text) return res.status(400).json({ error: 'Missing "text"' });

  try {
    const result = await translate(text, { to, from });
    return res.status(200).json({
      translatedText: result.text,
      fromLanguage: result.from.language.iso
    });
  } catch (error) {
    return res.status(500).json({ error: 'Translation failed', details: error.message });
  }
        }

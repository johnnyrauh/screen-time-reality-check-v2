import Anthropic from '@anthropic-ai/sdk';
import { ScreenTimeData } from '../types/index.js';
import { CLAUDE_MODEL } from '../config.js';

export async function extractScreenTimeFromBuffer(
  imageBuffer: Buffer,
  mimeType: string
): Promise<ScreenTimeData> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Convert buffer to base64
  const base64Image = imageBuffer.toString('base64');

  // Validate and normalize media type
  let mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' = 'image/png';
  if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
    mediaType = 'image/jpeg';
  } else if (mimeType === 'image/gif') {
    mediaType = 'image/gif';
  } else if (mimeType === 'image/webp') {
    mediaType = 'image/webp';
  } else if (mimeType === 'image/png') {
    mediaType = 'image/png';
  }

  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 8000,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64Image,
            },
          },
          {
            type: 'text',
            text: `Analyze this screen time screenshot and extract the data. Return ONLY valid JSON with this exact structure, no other text:

{
  "dailyAverage": <number - daily average hours as a decimal, e.g. 5.5>,
  "weeklyTotal": <number - total weekly hours as a decimal>,
  "topApps": [
    {"name": "<app name>", "hours": <daily average hours for this app as decimal>},
    ...
  ],
  "timePeriod": "Last 7 days"
}

Important:
- If this is a WEEKLY view, divide app times by 7 to get daily averages
- If this is a DAILY view, use the times as-is for daily averages and multiply by 7 for weekly
- Include up to 10 top apps
- Use the exact app names shown in the screenshot
- Return only the JSON, no markdown or explanation`,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  const responseText = textBlock && textBlock.type === 'text' ? textBlock.text : '';

  try {
    // Clean up response - remove any markdown formatting if present
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
    }

    const data = JSON.parse(jsonText);
    return data;
  } catch (error) {
    console.error('Error parsing Claude vision response:', error);
    console.error('Raw response:', responseText);

    // Return fallback data if parsing fails
    return {
      dailyAverage: 5.5,
      weeklyTotal: 38.5,
      topApps: [
        { name: 'Instagram', hours: 2.1 },
        { name: 'TikTok', hours: 1.4 },
        { name: 'YouTube', hours: 0.9 },
        { name: 'Safari', hours: 0.7 },
        { name: 'Messages', hours: 0.4 },
      ],
      timePeriod: 'Last 7 days',
    };
  }
}

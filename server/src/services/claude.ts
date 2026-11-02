import Anthropic from '@anthropic-ai/sdk';
import { QuestionnaireData, AnalysisResult } from '../types/index.js';
import { CLAUDE_MODEL } from '../config.js';
import { createAnalysisPrompt } from '../prompts/analysis.js';

export async function analyzeScreenTime(data: QuestionnaireData): Promise<AnalysisResult> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const prompt = createAnalysisPrompt(data);

  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  const responseText = textBlock && textBlock.type === 'text' ? textBlock.text : '';

  // Parse the JSON response from Claude
  try {
    // Clean up response - remove any markdown formatting if present
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
    }

    const result = JSON.parse(jsonText);
    return result;
  } catch (error) {
    console.error('Error parsing Claude response:', error);
    console.error('Raw response:', responseText);
    throw new Error('Failed to parse AI response');
  }
}

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type AssessmentPayload = {
  metalType?: string;
  productionRoute?: string;
  energySource?: string;
  transportMode?: string;
  endOfLife?: string;
  quantity?: number | string;
  region?: string;
};

type ResultsPayload = {
  carbonFootprint: number;
  energyConsumption: number;
  waterUsage: number;
  circularityIndex: number;
  recycledContent: number;
  wasteGenerated: number;
  resourceEfficiency: number;
  recommendations: string[];
};

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/';

function createSystemPrompt(assessment: AssessmentPayload, results: ResultsPayload): string {
  const {
    metalType = 'Unknown material',
    productionRoute = 'Not specified',
    energySource = 'Not specified',
    transportMode = 'Not specified',
    endOfLife = 'Not specified',
    quantity,
    region,
  } = assessment ?? {};

  const optionalDetails = [
    quantity ? `Quantity: ${quantity}` : null,
    region ? `Region: ${region}` : null,
  ]
    .filter(Boolean)
    .join(' | ');

  const recommendationBullets = results.recommendations.length
    ? results.recommendations.map((item, index) => `${index + 1}. ${item}`).join('\n')
    : 'No tailored recommendations were generated.';

  return [
    'You are a helpful assistant that analyses Life Cycle Assessment (LCA) outputs and provides actionable sustainability insights.',
    'Ground your answers strictly in the provided assessment context. Be concise, use bullet points when listing actions, and highlight the most impactful levers first.',
    '',
    'Assessment configuration:',
    `- Material: ${metalType}`,
    `- Production route: ${productionRoute}`,
    `- Energy source: ${energySource}`,
    `- Transport mode: ${transportMode}`,
    `- End-of-life option: ${endOfLife}`,
    optionalDetails ? `- Additional context: ${optionalDetails}` : '',
    '',
    'Computed indicators:',
    `- Carbon footprint: ${results.carbonFootprint} kg CO₂e per batch`,
    `- Energy consumption: ${results.energyConsumption} MJ`,
    `- Water usage: ${results.waterUsage} L`,
    `- Circularity index: ${results.circularityIndex}/100`,
    `- Recycled content: ${results.recycledContent}%`,
    `- Waste generated: ${results.wasteGenerated} kg`,
    `- Resource efficiency: ${results.resourceEfficiency}%`,
    '',
    'Current recommendations:',
    recommendationBullets,
    '',
    'When you respond, weave in the quantitative context above and suggest pragmatic next steps tailored to the user question. If the user asks for comparisons or scenarios, perform lightweight calculations based on the metrics provided rather than inventing new data.',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const rawMessages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const results: ResultsPayload | null = body?.results ?? null;
    const assessment: AssessmentPayload = body?.assessment ?? {};

    if (!results) {
      return NextResponse.json({ error: 'Results payload is required.' }, { status: 400 });
    }

    if (!rawMessages.length) {
      return NextResponse.json({ error: 'At least one user message is required.' }, { status: 400 });
    }

    const messages = rawMessages
      .filter((message): message is ChatMessage =>
        Boolean(message) &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0
      )
      .map((message) => ({
        role: message.role,
        content: message.content.trim(),
      }));

    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'The final message must come from the user.' }, { status: 400 });
    }

    const systemPrompt = createSystemPrompt(assessment, results);

    const client = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: GEMINI_BASE_URL,
    });

    const completion = await client.chat.completions.create({
      model: 'gemini-2.5-flash',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.4,
      top_p: 0.95,
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ error: 'Ai Agent returned an empty response.' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Ai Agent insights error:', error);
    return NextResponse.json({ error: 'Failed to generate insights.' }, { status: 500 });
  }
}

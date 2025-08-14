
import { GoogleGenAI, Type } from "@google/genai";
import type { CardData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cardDetailsSchema = {
  type: Type.OBJECT,
  properties: {
    name: { 
      type: Type.STRING, 
      description: "The creative and thematic name of the card." 
    },
    cost: { 
      type: Type.INTEGER, 
      description: "The power cost to play the card. Should be between 0 and 12." 
    },
    attack: { 
      type: Type.INTEGER, 
      description: "The attack power of the unit. If it's a spell, this should be 0." 
    },
    health: { 
      type: Type.INTEGER, 
      description: "The health of the unit. If it's a spell, this should be 0." 
    },
    cardText: { 
      type: Type.STRING, 
      description: "The rules text for the card, including any skills (e.g., Flying, Overwhelm, Aegis, Lifesteal, Summon). The text should be concise and clear." 
    },
    visualPrompt: { 
      type: Type.STRING, 
      description: "A vivid, detailed, and dramatic visual prompt for an AI image generator to create the card's art. Focus on a central character or object, its action, and the environment. Example: 'A heavily armored knight with a glowing blue sword, standing defiantly on a pile of defeated robots, with a futuristic city in ruins in the background.'" 
    },
  },
  required: ["name", "cost", "attack", "health", "cardText", "visualPrompt"],
};

export const generateCardDetails = async (theme: string): Promise<Omit<CardData, 'imageUrl'>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert game designer for the digital card game Eternal. Generate a new, unique, and balanced card concept based on the theme: "${theme}". The card should be a Unit or a Spell. If it's a spell, attack and health should be 0. Provide the card details in the requested JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: cardDetailsSchema,
      },
    });

    const jsonText = response.text.trim();
    const cardDetails = JSON.parse(jsonText);
    return cardDetails;
  } catch (error) {
    console.error("Error generating card details:", error);
    throw new Error("Failed to generate card details from Gemini.");
  }
};

export const generateCardImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: `${prompt}, fantasy art, epic, detailed, card game illustration`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '4:3',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating card image:", error);
    throw new Error("Failed to generate card image from Imagen.");
  }
};

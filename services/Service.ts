
import { GoogleGenAI, Type } from "@google/genai";

// Use process.env.API_KEY directly and create instances as needed.
export const generatePredictiveInsight = async (studentData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this student performance data and provide a concise predictive insight: ${JSON.stringify(studentData)}. 
    Focus on potential learning gaps and engagement risks. Format as JSON with keys 'message' and 'action'.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING },
          action: { type: Type.STRING }
        },
        required: ["message", "action"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateAdaptiveQuiz = async (subject: string, gaps: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 practice questions for the subject: ${subject}. Focus on closing these gaps: ${gaps.join(', ')}. Include 4 options and the correct answer index for each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.INTEGER }
          },
          required: ["question", "options", "correctIndex"]
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateProjectBrief = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a Project-Based Learning brief for the topic: ${topic}. Include a title, objective, and 3 key milestones. Format as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          milestones: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "objective", "milestones"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const chatWithTutor = async (message: string, history: {role: 'user' | 'model', text: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
    config: {
      systemInstruction: "You are a helpful, encouraging, and highly intelligent AI tutor for the AMEP educational platform. Your goal is to explain complex concepts simply, provide examples, and help students with their projects or homework. Be concise but warm."
    }
  });
  return response.text;
};

export const generateParentReport = async (studentName: string, progress: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a supportive and clear 2-sentence summary for a parent about their child ${studentName}'s progress in ${progress.subject}. Mention they have a mastery of ${progress.score}% and highlight a strength.`
  });
  return response.text;
};

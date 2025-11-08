export const DEFAULT_CHAT_MODEL: string = "gpt-4o";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "OpenAI flagship multimodal model.",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    description: "Fast, high-quality OpenAI model.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o-mini",
    description: "Lightweight, cheap, very fast.",
  }
];

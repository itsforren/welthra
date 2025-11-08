export const DEFAULT_CHAT_MODEL: string = "gpt-5";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "gpt-5",
    name: "GPT-5",
    description: "OpenAI flagship model with vision and advanced reasoning.",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    description: "Fast, high-quality OpenAI model.",
  }
];

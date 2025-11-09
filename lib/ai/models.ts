export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Welthra GPT-4o",
    description: "OpenAI’s flagship intelligence for Welthra.",
  },
  {
    id: "chat-model-reasoning",
    name: "Welthra Deep Thought (GPT-4o)",
    description: "Used for structured outputs and deep reasoning.",
  }
];

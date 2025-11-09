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
    description: "Powered by OpenAI GPT-4o. Advanced accuracy, insurance-optimized.",
  },
  {
    id: "chat-model-reasoning",
    name: "Welthra GPT-4o Reasoning",
    description: "Enhanced reasoning for complex IUL, annuity, and planning tasks.",
  }
];

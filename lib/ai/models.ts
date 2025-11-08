export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Grok-2 Vision",
    description: "xAI flagship model with vision and reasoning.",
  },
  {
    id: "chat-model-reasoning",
    name: "Grok 3 Mini (Reasoning)",
    description: "Reasoning model used for tool/function calling.",
  }
];

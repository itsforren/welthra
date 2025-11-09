export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Welthra",
    description: "Welthra’s flagship for wealth planning intelligence.",
  },
  {
    id: "chat-model-reasoning",
    name: "Welthra Deep Thought",
    description: "Used for structured outputs and deep reasoning.",
  }
];

import {
  customProvider,
  wrapLanguageModel,
  extractReasoningMiddleware,
} from "ai";

import { createOpenAI } from "@ai-sdk/openai";
import { isTestEnvironment } from "../constants";

// Create the OpenAI client (no Gateway)
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Test environment uses mocks
export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");

      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": openai.languageModel("gpt-4o"),
        "chat-model-reasoning": wrapLanguageModel({
          model: openai.languageModel("gpt-4.1"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": openai.languageModel("gpt-4o-mini"),
        "artifact-model": openai.languageModel("gpt-4o-mini"),
      },
    });

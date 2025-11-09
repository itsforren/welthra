// lib/ai/providers.ts

import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// Create an OpenAI client for the AI SDK
const openai = createOpenAI({
  // If you also use Vercel AI Gateway, you can pass baseURL here instead.
  apiKey: process.env.OPENAI_API_KEY!,
});

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
        // Main chat model (Welthra powered by GPT-4o)
        "chat-model": openai.languageModel("gpt-4o"),

        // Reasoning/tool-calling model (still GPT-4o, wrapped to capture reasoning traces)
        "chat-model-reasoning": wrapLanguageModel({
          model: openai.languageModel("gpt-4o"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),

        // Small/cheap model for titles
        "title-model": openai.languageModel("gpt-4o-mini"),

        // For artifacts/doc generation panes
        "artifact-model": openai.languageModel("gpt-4o-mini"),
      },
    });

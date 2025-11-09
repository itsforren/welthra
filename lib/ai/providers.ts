import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// ✅ TEST ENVIRONMENT USES MOCK MODELS
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
        // ✅ MAIN CHAT MODEL — Welthra GPT-4o
        "chat-model": {
          provider: "openai",
          modelId: "gpt-4o",
        },

        // ✅ REASONING MODEL — Wrapped GPT-4o
        "chat-model-reasoning": wrapLanguageModel({
          model: {
            provider: "openai",
            modelId: "gpt-4o",
          },
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),

        // ✅ TITLE GENERATION (smaller model)
        "title-model": {
          provider: "openai",
          modelId: "gpt-4o-mini",
        },

        // ✅ ARTIFACT / DOCUMENT GENERATION
        "artifact-model": {
          provider: "openai",
          modelId: "gpt-4o-mini",
        },
      },
    });

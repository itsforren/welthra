import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

import { isTestEnvironment } from "../constants";

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
        // ★ Your OpenAI models here
        "chat-model": {
          provider: "openai",
          model: "gpt-5"
        },
        "chat-model-reasoning": wrapLanguageModel({
          model: {
            provider: "openai",
            model: "gpt-4.1"
          },
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": {
          provider: "openai",
          model: "gpt-4.1"
        },
        "artifact-model": {
          provider: "openai",
          model: "gpt-4.1"
        },
      },
    });

import { gateway } from "@ai-sdk/gateway";
import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const { artifactModel, chatModel, reasoningModel, titleModel } = require("./models.mock");
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
        // Main chat
        "chat-model": gateway.languageModel("openai/gpt-4o"),
        // Tool/reasoning (same model wrapped with middleware)
        "chat-model-reasoning": wrapLanguageModel({
          model: gateway.languageModel("openai/gpt-4o"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        // Small/cheap models for titles & artifacts
        "title-model": gateway.languageModel("openai/gpt-4o-mini"),
        "artifact-model": gateway.languageModel("openai/gpt-4o-mini"),
      },
    });

import OpenAI from "openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// ✅ Initialize OpenAI client
const openai = new OpenAI({
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
        // ✅ The main chat model (GPT-5)
        "chat-model": wrapLanguageModel({
          model: openai.chat.completions,
        }),

        // ✅ Reasoning version — still GPT-5 but with "reasoning" tag
        "chat-model-reasoning": wrapLanguageModel({
          model: openai.chat.completions,
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),

        // ✅ Title model (also OpenAI)
        "title-model": wrapLanguageModel({
          model: openai.chat.completions,
        }),

        // ✅ Artifact / tool model (also OpenAI)
        "artifact-model": wrapLanguageModel({
          model: openai.chat.completions,
        }),
      },
    });

import { openai } from "@ai-sdk/openai";
import { customProvider, extractReasoningMiddleware, wrapLanguageModel } from "ai";
import { isTestEnvironment } from "../constants";

const buildProvider = () => {
  if (isTestEnvironment) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { artifactModel, chatModel, reasoningModel, titleModel } = require("./models.mock");

    return customProvider({
      languageModels: {
        "chat-model": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    });
  }

  const promptId = process.env.OPENAI_PROMPT_ID;

  if (!promptId) {
    throw new Error(
      "OPENAI_PROMPT_ID is not defined. Please set it to your OpenAI Prompt ID in the environment."
    );
  }

  const reasoningPromptId = process.env.OPENAI_REASONING_PROMPT_ID ?? promptId;

  return customProvider({
    languageModels: {
      "chat-model": openai(promptId),
      "chat-model-reasoning": wrapLanguageModel({
        model: openai(reasoningPromptId),
        middleware: extractReasoningMiddleware({ tagName: "think" }),
      }),
      "title-model": openai(process.env.OPENAI_TITLE_MODEL ?? "gpt-4o-mini"),
      "artifact-model": openai(process.env.OPENAI_ARTIFACT_MODEL ?? "gpt-4o-mini"),
    },
  });
};

export const myProvider = buildProvider();

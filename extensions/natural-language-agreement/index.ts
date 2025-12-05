import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const openai = createOpenAI({
    apiKey: undefined,
})

const { text } = await generateText({
    model: openai("gpt-4.1"),
    prompt: "What is love?",
})
console.log(text);
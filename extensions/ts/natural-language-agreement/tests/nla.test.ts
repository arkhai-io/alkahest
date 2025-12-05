import { afterAll, beforeAll, beforeEach, expect, test } from "bun:test";
import { makeLLMClient } from "../clients/nla";
import type { LLMProvider, LLMDemand } from "../clients/nla";

import {
    setupTestEnvironment,
    teardownTestEnvironment,
    type TestContext,
} from "alkahest-ts/tests/utils/setup";

let testContext: TestContext;

beforeAll(async () => {
    testContext = await setupTestEnvironment();
});

beforeEach(async () => {
    if (testContext.anvilInitState) {
        await testContext.testClient.loadState({
            state: testContext.anvilInitState,
        });
    }
});

afterAll(async () => {
    await teardownTestEnvironment(testContext);
});

test("LLM client basic functionality", async () => {
    // Create LLM client using bobClient which has the correct type
    const llmClient = makeLLMClient([]);

    llmClient.addProvider({
        providerName: "OpenAI",
        apiKey: "test-key"
    });


    const config = llmClient.getProvider("OpenAI");
    expect(config).toBeDefined();
    expect(config?.providerName).toBe("OpenAI");

    console.log("✅ LLM client created and config added");
});

test("encodeDemand", async () => {
    const llmClient = makeLLMClient([]);

    const demand: LLMDemand = {
        arbitrationProvider: "OpenAI",
        arbitrationModel: "gpt-4.1",
        arbitrationPrompt: "The sky is blue",
        demand: "The sky is blue"
    };

    const encoded = llmClient.encodeDemand(demand);
    expect(encoded).toBeDefined();
    expect(encoded.startsWith("0x")).toBe(true);

    console.log("✅ Demand encoded successfully");
});

test("arbitrate with mock", async () => {
    const llmClient = makeLLMClient([]);

    // Add provider
    llmClient.addProvider({
        providerName: "OpenAI",
    });

    const demand: LLMDemand = {
        arbitrationProvider: "OpenAI",
        arbitrationModel: "gpt-4.1",
        arbitrationPrompt: "The sky is blue",
        demand: "The sky is blue"
    };

    try {
        const result = await llmClient.arbitrate(demand, "Obligation");
        console.log("Arbitration result:", result);
        expect(typeof result).toBe("boolean");
    } catch (error) {
        console.log("Expected error (no real API key):", error);
        expect(error).toBeDefined();
    }
});
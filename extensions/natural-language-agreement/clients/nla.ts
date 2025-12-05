import {
    decodeAbiParameters,
    encodeAbiParameters,
    parseAbiParameters,
} from "viem";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";


export type LLMProvider = {
    providerName: string;
    apiKey?: string;
};

export type LLMDemand = {
    arbitrationProvider: string;
    arbitrationModel: string;
    arbitrationPrompt: string;
    demand: string;
};

export const makeLLMClient = (
    providers: LLMProvider[],
) => {

    const LLMAbi = parseAbiParameters(
        "(string arbitrationProvider, string arbitrationModel, string arbitrationPrompt, string demand)",
    );
    const encodeDemand = (demand: LLMDemand) => {
        return encodeAbiParameters(
            LLMAbi,
            [demand],
        );
    };

    const arbitrate = async (demand: LLMDemand, obligation: string): Promise<boolean> => {
        try {
            const matchingProvider = providers.find(provider =>
                provider.providerName.toLowerCase().includes(demand.arbitrationProvider.toLowerCase()) ||
                demand.arbitrationProvider.toLowerCase().includes(provider.providerName.toLowerCase())
            );

            const selectedProvider = matchingProvider || providers[0];

            if (!selectedProvider) {
                throw new Error('No LLM provider available');
            }

            console.log(`Using provider: ${selectedProvider.providerName} for arbitration demand: ${JSON.stringify(demand)}`);
            if (selectedProvider.providerName.toLowerCase() === 'openai') {

                const openai = createOpenAI({
                    apiKey: selectedProvider.apiKey,
                })

                // Replace placeholders with actual values
                const promptTemplate = `${demand.arbitrationPrompt}`
                    .replace(/\{\{demand\}\}/g, demand.demand)
                    .replace(/\{\{obligation\}\}/g, obligation);


                const { text } = await generateText({
                    model: openai(demand.arbitrationModel),
                    system: "You are an arbitrator that always tells the truth. You must respond with only 'true' or 'false' - no other words or explanations.",
                    prompt: `${promptTemplate}
Based on the above information, determine if the fulfillment satisfies the demand.
Answer ONLY with 'true' or 'false' - no explanations or additional text.`
                });

                console.log(`LLM Response: ${text}`);

                const cleanedResponse = text.trim().toLowerCase();
                return cleanedResponse === 'true';
            }
            return false;
        } catch (error) {
            console.error('Error in LLM arbitration:', error);
            throw new Error(`LLM arbitration failed: ${error}`);
        }
    };

    const addProvider = (provider: LLMProvider): void => {
        providers.push(provider);
    };

    const getProvider = (providerName: string): LLMProvider | undefined => {
        return providers.find(provider => provider.providerName.toLowerCase() === providerName.toLowerCase());
    };

    return {
        LLMAbi,
        arbitrate,
        encodeDemand,
        addProvider,
        getProvider,
        providers,
    };
};

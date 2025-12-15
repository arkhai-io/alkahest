import { $ } from "bun";
import type { TestContext } from "./setup";
/**
 * Tears down the test environment
 * @param context The test context to tear down
 */
export async function teardownTestEnvironment(context: TestContext) {
    // WebSocket error suppression is already installed globally, so we just clean up

    // Close WebSocket connections gracefully before killing Anvil
    if (context.wsTransports) {
        for (const transport of context.wsTransports) {
            try {
                // Access the internal socket state from viem's WebSocket transport
                const transportAny = transport as any;

                // Try to get the socket from various possible locations
                const socket =
                    transportAny?.socket ||
                    transportAny?.value?.socket ||
                    transportAny?.getSocket?.() ||
                    transportAny?.config?.socket;

                if (socket) {
                    // Disable error event listeners before closing
                    if (socket.onerror) socket.onerror = null;
                    if (socket.onclose) socket.onclose = null;

                    // Close the socket
                    if (typeof socket.close === "function") {
                        socket.close(1000, "Test teardown"); // Normal closure
                    }
                }
            } catch (e) {
                // Ignore errors during WebSocket cleanup
            }
        }
        // Give WebSockets time to close gracefully
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Kill Anvil process
    await $`pkill anvil 2>/dev/null || true`;

    // Small delay to ensure cleanup
    await new Promise((resolve) => setTimeout(resolve, 50));
}

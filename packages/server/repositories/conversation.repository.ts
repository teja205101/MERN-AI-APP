// Implementation detail
const conversations = new Map<string, string>();

// Export public interface
export function getLastResponseId(conversationId: string) {
   return conversations.get(conversationId);
}

export function setLastResponseId(conversationId: string, responseId: string) {
   return conversations.set(conversationId, responseId);
}

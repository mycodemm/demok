// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SEND_MESSAGES") {
    handleMessageSending(request.data);
    sendResponse({ success: true });
  }
  return true;
});

async function handleMessageSending({ contacts, message, files, delay }) {
  // Inject content script into WhatsApp Web
  const [tab] = await chrome.tabs.query({ url: "https://web.whatsapp.com/*" });

  if (!tab?.id) {
    chrome.tabs.create({ url: "https://web.whatsapp.com" });
    return;
  }

  // Send messages one by one with delay
  for (const contact of contacts) {
    await chrome.tabs.sendMessage(tab.id, {
      type: "SEND_MESSAGE",
      data: { contact, message, files },
    });

    // Wait for the specified delay
    await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  }
}

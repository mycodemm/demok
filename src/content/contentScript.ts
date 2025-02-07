// Helper to wait for elements to appear in DOM
const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

// Listen for messages from background script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "SEND_MESSAGE") {
    const { contact, message, files } = request.data;

    try {
      // Search for contact
      const searchBox = (await waitForElement(
        'div[title="Search input textbox"]',
      )) as HTMLElement;
      searchBox.click();
      document.execCommand("insertText", false, contact.phone);

      // Wait for and click the contact
      const contactElement = (await waitForElement(
        `span[title="${contact.phone}"]`,
      )) as HTMLElement;
      contactElement.click();

      // Type and send message
      const inputBox = (await waitForElement(
        'div[title="Type a message"]',
      )) as HTMLElement;
      inputBox.click();
      document.execCommand("insertText", false, message);

      // Handle file attachments if any
      if (files?.length) {
        const attachButton = (await waitForElement(
          'span[data-icon="attach-menu-plus"]',
        )) as HTMLElement;
        attachButton.click();
        // Note: File attachment requires additional handling
      }

      // Send message
      const sendButton = (await waitForElement(
        'span[data-icon="send"]',
      )) as HTMLElement;
      sendButton.click();

      sendResponse({ success: true });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true;
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBlocking = document.getElementById('toggleBlocking');
  
    // Initialize the toggle state
    chrome.storage.local.get('isBlockingEnabled', (data) => {
      toggleBlocking.checked = data.isBlockingEnabled || false;
    });
  
    // Add event listener to the toggle switch
    toggleBlocking.addEventListener('change', () => {
      const isEnabled = toggleBlocking.checked;
      chrome.storage.local.set({ isBlockingEnabled: isEnabled }, () => {
        console.log(`Ad blocking ${isEnabled ? 'enabled' : 'disabled'}.`);
      });
    });
  });
  
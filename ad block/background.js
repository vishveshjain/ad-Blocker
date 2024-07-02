const adDomains = [
    "doubleclick.net",
    "googlesyndication.com",
    "googleadservices.com",
    "adsafeprotected.com",
    "adnxs.com",
    "adsrvr.org",
    "adroll.com",
    "criteo.com",
    "rubiconproject.com",
    "pubmatic.com",
    "openx.net",
    "quantserve.com",
    "scorecardresearch.com",
    "zedo.com"
  ];
  
  const rules = adDomains.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `*://*.${domain}/*`,
      resourceTypes: [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "image",
        "font",
        "object",
        "xmlhttprequest",
        "ping",
        "csp_report",
        "media",
        "websocket",
        "other"
      ]
    }
  }));
  
  function enableBlocking() {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules,
      removeRuleIds: rules.map(rule => rule.id)
    }).then(() => {
      console.log("Ad blocking rules have been added.");
    }).catch(error => {
      console.error("Error adding ad blocking rules:", error);
    });
  }
  
  function disableBlocking() {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [],
      removeRuleIds: rules.map(rule => rule.id)
    }).then(() => {
      console.log("Ad blocking rules have been removed.");
    }).catch(error => {
      console.error("Error removing ad blocking rules:", error);
    });
  }
  
  // Initialize based on stored setting
  chrome.storage.local.get('isBlockingEnabled', (data) => {
    if (data.isBlockingEnabled) {
      console.log("Ad blocking is enabled on startup.");
      enableBlocking();
    } else {
      console.log("Ad blocking is disabled on startup.");
      disableBlocking();
    }
  });
  
  // Listen for storage changes to toggle ad blocking
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.isBlockingEnabled) {
      if (changes.isBlockingEnabled.newValue) {
        console.log("Enabling ad blocking.");
        enableBlocking();
      } else {
        console.log("Disabling ad blocking.");
        disableBlocking();
      }
    }
  });
  
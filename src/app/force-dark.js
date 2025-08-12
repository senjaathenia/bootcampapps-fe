// Force dark theme immediately
(function () {
  console.log("🌙 Force Dark Theme Script Loading...");

  // Set styles immediately
  const style = document.createElement("style");
  style.textContent = `
    * { 
      background-color: #171717 !important; 
      color: white !important; 
    }
    html, body { 
      background-color: #171717 !important; 
      color: white !important; 
      margin: 0 !important; 
      padding: 0 !important; 
    }
  `;
  document.head.appendChild(style);

  // Force background on html and body
  document.documentElement.style.setProperty(
    "background-color",
    "#171717",
    "important"
  );
  document.documentElement.style.setProperty("color", "white", "important");

  if (document.body) {
    document.body.style.setProperty("background-color", "#171717", "important");
    document.body.style.setProperty("color", "white", "important");
  }

  // Watch for body creation
  const observer = new MutationObserver(function (mutations) {
    if (document.body) {
      document.body.style.setProperty(
        "background-color",
        "#171717",
        "important"
      );
      document.body.style.setProperty("color", "white", "important");
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  console.log("🌙 Force Dark Theme Applied!");
})();

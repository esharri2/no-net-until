(function () {
  chrome.storage.local.get(["noNetUntil"], function (result) {
    if (
      !result ||
      (typeof result === "object" && Object.keys(result).length === 0) ||
      !result.noNetUntil
    ) {
      return;
    }
    const noNetUntil = new Date(result.noNetUntil).getTime();
    const now = new Date().getTime();
    if (noNetUntil < now) {
      chrome.storage.local.clear();
    } else {
      document.querySelector("body").remove();
      const readableTime = new Intl.DateTimeFormat([], {
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date(result.noNetUntil));
      document.querySelector("html").insertAdjacentHTML(
        "beforeend",
        `<body>
                <p>No web until ${readableTime}</p>
              <style>
                html {
                    font-family: 'Courier New', monospace !important;
                    font-size: 60px !important;
                    color: white !important;
                    background-color: black !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                    height: 100vh !important;
                }
                p {
                    max-width: 70vw !important;
                }

              </style>             
              </body>`
      );
    }
  });
})();

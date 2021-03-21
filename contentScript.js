// Check timestamp in storage
// if current time is beyond this time, clear storage
// else, disable the page

(function () {
  chrome.storage.local.get(["noNetUntil"], function (result) {
    chrome.storage.local.clear('noNetUntil', ()=>{});
    if (
      !result ||
      (typeof result === "object" && Object.keys(result).length === 0)
    ) {
      return;
    }
    console.log(result);
    const noNetUntil = new Date(result).getTime();
    const now = new Date().getTime();
    console.log({ now, noNetUntil });
    if (noNetUntil >= now) {
      chrome.storage.local.clear("noNetUntil", () => {});
    } else {
      document.querySelector("body").remove();
      const readableTime = noNetUntil;
      document.querySelector("html").insertAdjacentHTML(
        "beforeend",
        `<body>
                <p>No web until ${readableTime}</p>
                <span class="skull">&#128369;</span>
                <span class="skull">&#x1f480;</span>

              <style>
                html {
                    font-family: 'Courier New', monospace;
                    font-size: 60px;
                    color: white;
                    background-color: black;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }

                .skull {
                    font-size: 300px;
                    font-family: monospace !important;
                }
              </style>
              
              </body>`
      );
    }

    console.log("Value currently is " + result.key);
  });
})();

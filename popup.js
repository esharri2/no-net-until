(function () {
  chrome.storage.local.get(["noNetUntil"], (result) => {
    const noNetUntil = new Date(result.noNetUntil || 0).getTime();
    const now = new Date().getTime();
    if (noNetUntil < now) {
      const disabledEls = document.querySelectorAll("[disabled]");
      disabledEls.forEach((el) => {
        el.removeAttribute("disabled");
      });
      const submitButton = document.querySelector("#submit");
      const handleClick = (event) => {
        event.preventDefault();
        const noNetUntil = document.querySelector("#time").value;
        chrome.storage.local.set({ noNetUntil }, function () {
          submitButton.innerHTML = "saved";
        });
      };
      submitButton.addEventListener("click", handleClick);
      chrome.storage.local.clear();
    } else {
      document.querySelector("#picker").remove();
      const hiddenEl = document.querySelector("[hidden]");
      if (hiddenEl) {
        hiddenEl.removeAttribute("hidden");
      }
      const readableTime = new Intl.DateTimeFormat([], {
        dateStyle: "full",
        timeStyle: "long",
      }).format(new Date(result.noNetUntil));
      document.querySelector("[data-time-display]").innerHTML = readableTime;
    }
  });
})();

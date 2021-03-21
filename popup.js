(function () {
  const submitButton = document.querySelector("#submit");
  const handleClick = (event) => {
    event.preventDefault();
    const noNetUntil = document.querySelector("#time").value;
    chrome.storage.local.set({ noNetUntil }, function () {
      submitButton.innerHTML = "saved"
    });
  };
  submitButton.addEventListener("click", handleClick);
})();

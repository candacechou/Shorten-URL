
const copybottonHandler = document.querySelector(".Copy-button");
copybottonHandler.addEventListener('click', function onbottonClicked(event) {


  let copyText = document.getElementById("shorten-URL-Text");
  console.log("copyText:", copyText)
  // Copy the text inside the text field
  copyToClipboard(copyText.textContent);

});

async function copyToClipboard(text) {
  await await navigator.clipboard.writeText(text);
  // Alert the copied text
  alert("The URL has been copied: " + text);

}




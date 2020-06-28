const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let maxApiExpectedError = 10;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrlToBypassCorsPolicy = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrlToBypassCorsPolicy + apiUrl);
    const data = await response.json();

    // If Author is blank, add 'Unkown'
    data.quoteAuthor === ""
      ? authorText.innerText = "Unknown"
      : authorText.innerText = data.quoteAuthor;
    // Reduce font-size for long quotes
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    maxApiExpectedError--;
    maxApiExpectedError > 0
      ? getQuote()
      : console.log("Whoops! Cann't get quotes from server: ", error);
  }
}

// Tweet Quote
function twitterQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl =
    `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", twitterQuote);

// On Load
getQuote();

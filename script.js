const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");

// Get Quote From API
async function getQuote() {
  // Using an intermediate server to get quotes because of CORS policy
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    console.log("Making request...");
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

    console.log(data);
  } catch (error) {
    getQuote();
    console.log("Whoops! ", error);
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

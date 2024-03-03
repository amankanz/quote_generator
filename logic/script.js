// Selecting elements
const quote_container = document.getElementById('quote-container');
const quote_text = document.getElementById('quote');
const author_text = document.getElementById('author');
const x_btn = document.getElementById('twitter');
const new_quote_btn = document.getElementById('new-quote');

let apiQuotes = [];

// Show new function
const new_quote = function () {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.character.name) {
    author_text.textContent = 'Unknown';
  } else {
    author_text.textContent = quote.character.name;
  }
  if (quote.sentence.length > 100) {
    quote_text.classList.add('long-quote');
  } else {
    quote_text.classList.remove('long-quote');
  }
  quote_text.textContent = quote.sentence;
};

// Get Quotes from API
async function get_quotes() {
  const api_url = 'https://api.gameofthronesquotes.xyz/v1/random/3';
  try {
    const response = await fetch(api_url);
    apiQuotes = await response.json();
    new_quote();
  } catch (error) {
    // Catch error here
  }
}

// Tweet a quote
const tweet_quote = function () {
  const twitter_url = `https://twitter.com/intent/tweet?text=${quote_text.textContent} - ${author_text.textContent}`;
  window.open(twitter_url, '_blank');
};

x_btn.addEventListener('click', tweet_quote);
new_quote_btn.addEventListener('click', get_quotes);

// On Load
get_quotes();

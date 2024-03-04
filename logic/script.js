// Selecting elements
const quote_container = document.getElementById('quote-container');
const quote_text = document.getElementById('quote');
const author_text = document.getElementById('author');
const x_btn = document.getElementById('twitter');
const new_quote_btn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
const loading = function () {
  loader.hidden = false;
  quote_container.hidden = true;
};

// Hide loading
const complete_loading = function () {
  quote_container.hidden = false;
  loader.hidden = true;
};

// Show new function
const new_quote = function () {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    author_text.textContent = '- Unknown';
  } else {
    author_text.textContent = `- ${quote.author}`;
  }
  if (quote.content.length > 100) {
    quote_text.classList.add('long-quote');
  } else {
    quote_text.classList.remove('long-quote');
  }
  // Set quote, Hide loader
  quote_text.textContent = quote.content;
  complete_loading();
};

// Get Quotes from API
async function get_quotes() {
  loading();
  const api_url = 'https://api.quotable.io/quotes/random?limit=5';
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
